// backend/test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import request from 'supertest';
import * as http from 'http';
import { TypeOrmExceptionFilter } from './../src/common/filters/typeorm-exception.filter';

// Define response interfaces for type safety
interface UserResponse {
  id: string;
  email: string;
  username: string;
}

interface LoginResponse {
  access_token: string;
}

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new TypeOrmExceptionFilter());
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterEach(async () => {
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('should register a new user successfully', () => {
    return request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      })
      .expect(201)
      .then((response: { body: UserResponse }) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toEqual('test@example.com');
        expect(response.body).not.toHaveProperty('password');
      });
  });

  it('should fail to register a user with a duplicate email', async () => {
    await request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'duplicate@example.com',
        username: 'user1',
        password: 'password123',
      });

    return request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'duplicate@example.com',
        username: 'user2',
        password: 'password123',
      })
      .expect(409);
  });

  it('should log in a registered user and return a JWT', async () => {
    await request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'login@example.com',
        username: 'loginuser',
        password: 'password123',
      });

    return request(app.getHttpServer() as http.Server)
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'password123' })
      .expect(200)
      .then((response: { body: LoginResponse }) => {
        expect(response.body).toHaveProperty('access_token');
        expect(typeof response.body.access_token).toBe('string');
      });
  });

  it('should fail to log in with incorrect credentials', () => {
    return request(app.getHttpServer() as http.Server)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' })
      .expect(401);
  });

  it('should return a 404 for non-existent endpoints', () => {
    return request(app.getHttpServer() as http.Server)
      .get('/non-existent-endpoint')
      .expect(404);
  });

  it('should return a 404 for non-existent user', () => {
    return request(app.getHttpServer() as http.Server)
      .get('/users/non-existent-id')
      .expect(404);
  });

  it('should fail to create a note if not authenticated', () => {
    return request(app.getHttpServer() as http.Server)
      .post('/notes')
      .send({ title: 'Test Note', content: 'This should fail.' })
      .expect(401); // Expecting Unauthorized error
  });

  it('should allow a logged-in user to create a note', async () => {
    // Register a user first
    await request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'noteuser@example.com',
        username: 'noteuser',
        password: 'password123',
      });

    // Log in to get the token
    const loginResponse = await request(app.getHttpServer() as http.Server)
      .post('/auth/login')
      .send({ email: 'noteuser@example.com', password: 'password123' });

    // Extract the token from the login response
    const token = (loginResponse.body as { access_token: string }).access_token;

    // Now, try to create a note with the token
    return request(app.getHttpServer() as http.Server)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Protected Note', content: 'This should work!' })
      .expect(201)
      .then((response: { body: { id: string; title: string } }) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toEqual('My Protected Note');
      });
  });

  it('should fail to log in with incorrect password', async () => {
    // First, register a user
    await request(app.getHttpServer() as http.Server)
      .post('/users')
      .send({
        email: 'badpass@example.com',
        username: 'badpass',
        password: 'password123',
      });

    // Now, try to log in with the wrong password
    return request(app.getHttpServer() as http.Server)
      .post('/auth/login')
      .send({ email: 'badpass@example.com', password: 'wrongpassword' })
      .expect(401); // Expecting Unauthorized error
  });
});
