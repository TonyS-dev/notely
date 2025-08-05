# Notes Management SPA (Frontend)

A modern, full-featured Single-Page Application (SPA) for managing notes, users, and categories. Built with React, TypeScript, and Vite, this project demonstrates advanced frontend concepts including JWT-based authentication, protected client-side routing, full CRUD operations, and a professional, responsive UI/UX. Users can register, log in, create notes, organize them by categories, and manage their data securely.

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
npm run dev
```

- Open in your browser: [http://localhost:5173](http://localhost:5173)

---

## 👤 Default Users

You can register new accounts directly from the login page.

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

- **✅ JWT-Based Authentication System:**
    - All users can create, edit, and manage their own notes and categories
    - Secure password handling using bcrypt
- **✅ Persistent Sessions:**
    - User session is maintained across page reloads using localStorage
    - Secure logout process that clears session data
- **✅ Protected Client-Side Routing:**
    - Routes are protected based on user authentication status
    - Unauthorized access attempts are gracefully handled and redirected
    - Dynamic route parameters for editing specific notes and categories
- **✅ Full CRUD Functionality:**
    - Users can create, read, update, and delete their own accounts
    - Notes: Users can create, read, update, delete, archive, and duplicate notes
    - Categories: Users can create and list categories
- **✅ Category System:**
    - Organize notes by categories
    - Only the owner can manage their categories
- **✅ Dynamic & Professional UI/UX:**
    - Responsive design for desktop and mobile
    - Visual feedback for user actions and comprehensive error handling

---

## ⚙️ Runtimes & Engines

- **Node.js** (`>=18.17.0`): JavaScript runtime environment
- **npm** (`>=9.6.7`): Node.js package manager

---

## 🛠️ Technologies Used

- **React** (`^19.1.0`): Component-based UI library
- **React DOM** (`^19.1.0`): DOM rendering for React
- **React Router DOM** (`^7.7.1`): Client-side routing
- **Vite** (`^7.0.4`): Fast development server and build tool
- **TypeScript** (`~5.8.3`): Type safety and modern JavaScript features
- **Axios** (`^1.11.0`): HTTP requests to backend API
- **jwt-decode** (`^4.0.0`): JWT token decoding
- **react-hot-toast** (`^2.5.2`): Toast notifications for UI feedback
- **ESLint** (`^9.30.1`): Linting for code quality
- **Prettier** (`^10.1.8`): Code formatting
- **eslint-plugin-prettier** (`^5.5.3`): Prettier integration for ESLint
- **eslint-plugin-react-hooks** (`^5.2.0`): React hooks linting
- **eslint-plugin-react-refresh** (`^0.4.20`): Fast refresh for React
- **typescript-eslint** (`^8.35.1`): TypeScript linting
- **@vitejs/plugin-react** (`^4.6.0`): Vite plugin for React
- **@types/react** (`^19.1.8`): TypeScript types for React
- **@types/react-dom** (`^19.1.6`): TypeScript types for React DOM

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.tsx                  # App entry point
│   ├── App.tsx                   # Main application component
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Route-based page components
│   ├── services/                 # API and auth logic
│   ├── hooks/                    # Custom React hooks
│   ├── context/                  # Global state/context providers
│   ├── styles/                   # CSS/SCSS files
│   └── utils/                    # Utility functions
├── public/                       # Static assets
├── package.json                  # Project scripts and dependencies
├── tsconfig.json                 # TypeScript config
├── README.md                     # Project documentation
└── ...
```

---

## 🌐 API Endpoints (Backend)

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

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## 📝 Code Quality & Architecture

- **Modular Design:** Organized by feature modules (auth, users, notes, categories)
- **Type Safety:** TypeScript throughout the codebase
- **Validation:** Form validation and error handling
- **Security:** Passwords hashed, JWT authentication, protected endpoints
- **Testing:** Unit and integration tests for reliability
- **Protected Routing:** Client-side route protection based on authentication status and user roles

---

## Author

Antonio Santiago
