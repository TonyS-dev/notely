# The Notes API Backend

A modern, full-featured RESTful backend for managing notes, users, and categories. Built with NestJS, TypeORM, and PostgreSQL, this project demonstrates advanced backend concepts including JWT-based authentication, protected endpoints, full CRUD operations, and a clean, modular architecture. The system allows users to register, log in, create notes, organize them by categories, and manage their data securely.

---

## 📋 About me

- **Name:** Antonio Santiago
- **Email:** santiagor.acarlos@gmail.com
- **GitHub:** [TonyS-dev](https://github.com/TonyS-dev)

---

## 📋 Instructions

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run start:dev
```

- The API will be available at: `http://localhost:3000`

**Run tests:**

```bash
npm run test:e2e
```

---

## 👤 Default Users

You can register new accounts via the `/users` endpoint. Example default users:

- **Administrator:**
    - Email: admin@admin.com
    - Password: admin123
    - Role: Admin (can manage users and notes)
- **User:**
    - Email: juan.perez@user.com
    - Password: juan123
    - Role: User (can create and manage their own notes)

*Note: Passwords are securely hashed using bcrypt before storage.*

---

## 🎯 Core Features

- **✅ JWT-Based Authentication:**
    - Secure login and registration
    - Protected endpoints for notes and categories
- **✅ Persistent Sessions:**
    - JWT tokens for stateless authentication
    - Secure logout by removing token client-side
- **✅ Protected Routing:**
    - Endpoints require authentication
    - Unauthorized access returns 401
- **✅ Full CRUD Functionality:**
    - Users: Register and log in
    - Notes: Create, read, update, delete, archive, duplicate
    - Categories: Create and list categories
- **✅ Category System:**
    - Organize notes by categories
    - Only the owner can manage their categories
- **✅ Robust Error Handling:**
    - Custom TypeORM exception filter for database errors
    - Validation and security checks on all endpoints

---

## 🛠️ Technologies Used

- **NestJS:** Modular Node.js framework
- **TypeORM:** ORM for PostgreSQL
- **PostgreSQL:** Relational database
- **JWT:** Authentication tokens
- **bcrypt:** Password hashing
- **class-validator:** Input validation
- **Supertest/Jest:** E2E and unit testing

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.controller.ts         # API status and health endpoints
│   ├── app.module.ts             # Main application module
│   ├── app.service.ts            # API status logic
│   ├── auth/                     # Authentication (JWT, login, guards)
│   ├── categories/               # Category entity, controller, service
│   ├── notes/                    # Note entity, controller, service
│   ├── users/                    # User entity, controller, service
│   └── common/filters/           # Custom error filters
├── test/                         # E2E tests
├── package.json                  # Project scripts and dependencies
├── tsconfig.json                 # TypeScript config
├── README.md                     # Project documentation
└── ...
```

---

## 🌐 API Endpoints

**Users:**
- `POST /users` - Register a new user

**Auth:**
- `POST /auth/login` - Log in and receive JWT

**Notes:**
- `POST /notes` - Create a note
- `GET /notes/active` - List active notes
- `GET /notes/archived` - List archived notes
- `PUT /notes/:id` - Update a note
- `PATCH /notes/:id/archive` - Archive a note
- `PATCH /notes/:id/unarchive` - Unarchive a note
- `POST /notes/duplicate/:id` - Duplicate a note
- `DELETE /notes/:id` - Delete a note

**Categories:**
- `POST /categories` - Create a category
- `GET /categories` - List categories

---

## 🔄 Available Scripts

- `npm run start` - Start the API in production mode
- `npm run start:dev` - Start the API in development mode (with hot reload)
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## 📝 Code Quality & Architecture

- **Modular Design:** Organized by feature modules (auth, users, notes, categories)
- **Type Safety:** TypeScript throughout the codebase
- **Validation:** DTOs and class-validator for input validation
- **Error Handling:** Custom filters for database errors
- **Security:** Passwords hashed, JWT authentication, protected endpoints
- **Testing:** E2E and unit tests for reliability

---

## Author

Antonio Santiago
