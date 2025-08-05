# The Notes API Backend

A modern, full-featured RESTful backend for managing notes, users, and categories. Built with NestJS, TypeORM, and PostgreSQL, this project demonstrates advanced backend concepts including JWT-based authentication, protected endpoints, full CRUD operations, and a clean, modular architecture. The system allows users to register, log in, create notes, organize them by categories, and manage their data securely.

---

## 📋 About Me

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

- **TonyS-dev:**
    - Email: tony@mail.com
    - Password: password123
- **Vivi:**
    - Email: vivi@mail.com
    - Password: password123
- **Antonio:**
    - Email: antonio@mail.com
    - Password: password123
- **TestUser:**
    - Email: testuser@mail.com
    - Password: password123

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

## ⚙️ Runtimes & Engines

- **Node.js** (`>=18.17.0`): JavaScript runtime environment
- **npm** (`>=9.6.7`): Node.js package manager
- **PostgreSQL** (`^8.16.3`): Relational database engine

---

## 🛠️ Technologies Used

- **NestJS** (`^11.0.1`): Modular Node.js framework
- **TypeORM** (`^0.3.25`): ORM for PostgreSQL
- **JWT & Passport** (`^11.0.0`, `^11.0.5`, `^4.0.1`, `^1.0.0`, `^0.7.0`): Authentication and authorization
- **bcrypt** (`^6.0.0`): Password hashing
- **class-validator & class-transformer** (`^0.14.2`, `^0.5.1`): Input validation and transformation
- **RxJS** (`^7.8.1`): Reactive programming utilities
- **Reflect-metadata** (`^0.2.2`): TypeScript metadata reflection
- **Supertest** (`^7.0.0`): E2E testing
- **Jest** (`^30.0.0`): Unit and integration testing
- **ESLint** (`^9.18.0`): Linting for code quality
- **Prettier** (`^3.4.2`): Code formatting
- **typescript-eslint** (`^8.20.0`): TypeScript linting
- **ts-node** (`^10.9.2`): TypeScript runtime
- **ts-jest** (`^29.2.5`): TypeScript testing
- **@nestjs/config** (`^4.0.2`): Environment configuration

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
