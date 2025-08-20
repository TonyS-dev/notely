// backend/test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import request from 'supertest';
import * as http from 'http';
import { TypeOrmExceptionFilter } from './../src/common/filters/typeorm-exception.filter';
import { Reflector } from '@nestjs/core';

// --- TYPE DEFINITIONS FOR API RESPONSES ---
interface UserResponse {
  id: string;
  email: string;
  username: string;
}

interface LoginResponse {
  access_token: string;
}

interface CategoryResponse {
  id: string;
  name: string;
}

interface NoteResponse {
  id: string;
  title: string;
  content: string;
  categories: CategoryResponse[];
}

describe('App E2E Tests', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let authToken: string; // This will now be reset before each test

  // beforeAll should ONLY set up things that persist for ALL tests,
  // like the app instance itself.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new TypeOrmExceptionFilter());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();

    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    // 1. Clean the database BEFORE each test to ensure a clean slate.
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }

    // 2. Create a fresh user and token for the upcoming test.
    await request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'testuser@e2e.com',
        username: 'e2e_user',
        password: 'password123',
      });

    const loginResponse = await request(app.getHttpServer() as http.Server)
      .post('/auth/login')
      .send({ email: 'testuser@e2e.com', password: 'password123' });

    authToken = (loginResponse.body as LoginResponse).access_token;
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  // -- Test Group for Authentication and Users --
  describe('Authentication and Users', () => {
    // This test runs in isolation, with its own fresh database state.
    it('should register a new user successfully', () => {
      return request(app.getHttpServer() as http.Server)
        .post('/users')
        .send({
          email: 'anotheruser@example.com',
          username: 'anotheruser',
          password: 'password123',
        })
        .expect(201)
        .then((response: { body: UserResponse }) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.email).toEqual('anotheruser@example.com');
        });
    });

    it('should fail to register a user with a duplicate email', async () => {
      // The user 'testuser@e2e.com' already exists from the beforeEach hook.
      return request(app.getHttpServer() as http.Server)
        .post('/users')
        .send({
          email: 'testuser@e2e.com',
          username: 'another_e2e_user',
          password: 'password123',
        })
        .expect(409);
    });

    it('should log in a registered user and return a JWT', async () => {
      // Verify the login for the user created in beforeEach
      return request(app.getHttpServer() as http.Server)
        .post('/auth/login')
        .send({ email: 'testuser@e2e.com', password: 'password123' })
        .expect(200)
        .then((response: { body: LoginResponse }) => {
          expect(response.body).toHaveProperty('access_token');
        });
    });

    it('should fail to log in with incorrect credentials', () => {
      return request(app.getHttpServer() as http.Server)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' })
        .expect(401);
    });
  });

  // -- Test Group for Notes --
  describe('Notes', () => {
    it('should fail to create a note if not authenticated', () => {
      return request(app.getHttpServer() as http.Server)
        .post('/notes')
        .send({ title: 'Test Note', content: 'This should fail.' })
        .expect(401);
    });

    // Test Note Creation
    it('should allow a logged-in user to create a note', () => {
      return request(app.getHttpServer() as http.Server)
        .post('/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'My Protected Note', content: 'This should work!' })
        .expect(201)
        .then((response: { body: { id: string; title: string } }) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.title).toEqual('My Protected Note');
        });
    });

    // Test Note Update
    it('should correctly update a note, including its categories, and return 200 OK', async () => {
      const category1Res = await request(app.getHttpServer() as http.Server)
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'E2E Initial Category' })
        .expect(201);
      const category1Id = (category1Res.body as CategoryResponse).id;

      const category2Res = await request(app.getHttpServer() as http.Server)
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'E2E Updated Category' })
        .expect(201);
      const category2Id = (category2Res.body as CategoryResponse).id;

      const createNoteRes = await request(app.getHttpServer() as http.Server)
        .post('/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Note to be updated',
          content: 'Initial content.',
          categoryIds: [category1Id],
        })
        .expect(201);

      const noteToUpdateId = (createNoteRes.body as NoteResponse).id;
      expect((createNoteRes.body as NoteResponse).categories[0].id).toBe(
        category1Id,
      );

      const response = await request(app.getHttpServer() as http.Server)
        .put(`/notes/${noteToUpdateId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Note Title',
          content: 'The content has been successfully updated.',
          categoryIds: [category2Id],
        });

      expect(response.status).toBe(200);

      const updatedNote = response.body as NoteResponse;
      expect(updatedNote.id).toBe(noteToUpdateId);
      expect(updatedNote.title).toBe('Updated Note Title');

      expect(updatedNote.categories).toBeInstanceOf(Array);
      expect(updatedNote.categories).toHaveLength(1);
      expect(updatedNote.categories[0].id).toBe(category2Id);
      expect(updatedNote.categories[0].name).toBe('E2E Updated Category');
    });
  });

  describe('General App Health', () => {
    it('should return a 404 for non-existent endpoints', () => {
      return request(app.getHttpServer() as http.Server)
        .get('/this-route-does-not-exist')
        .expect(404);
    });
  });
});
