# Full-Stack Notes Management Application

A modern, full-stack, and containerized web application for note-taking. This project is built with a professional SPA (Single-Page Application) architecture, featuring a React frontend and a NestJS backend, fully orchestrated with Docker.

![App Screenshot](app.png)

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript, Vite, React Router, Axios
-   **Backend:** NestJS, TypeORM, PostgreSQL, JWT for Authentication
-   **DevOps:** Docker, Docker Compose

---

## ✅ Core Features

-   **Full JWT Authentication:** Secure user registration and login.
-   **Complete CRUD Operations:** Create, read, update, and delete notes.
-   **Note Management:** Archive, unarchive, and duplicate notes.
-   **Category System:** Organize notes with custom categories.
-   **Protected Routes:** Both client-side and server-side routes are protected based on authentication.
-   **Containerized Environment:** The entire application stack is managed by Docker for consistency and ease of setup.
-   **Responsive UI:** A clean and modern user interface that works on desktop and mobile.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed on your system. This project is designed to be run with Docker, which handles all other dependencies.

-   **Docker Engine**: Version `20.10.0` or newer.
-   **Docker Compose**: Version `2.0.0` or newer (this is included with all modern Docker installations).

You can verify your installation by running `docker --version` and `docker compose version`.

➡️ **[Official Docker Installation Guide](https://docs.docker.com/engine/install/)**

### How to Run the Application

Once the prerequisites are met, you can start the entire application stack (Frontend, Backend, and Database) with a single command.

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:hirelens-challenges/Santiago-837721.git
    cd Santiago-837721
    ```

2.  **Make the startup script executable (only needs to be done once):**

    ```bash
    chmod +x start.sh
    ```

3.  **Run the script:**
    ```bash
    ./start.sh
    ```

The script will check for prerequisites, build the necessary Docker images, and start all services. Once it's finished, the application will be available at:

-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend API**: [http://localhost:3000](http://localhost:3000)

---

## 👤 Default Users

You can use the following default credentials to log in, or register a new user directly from the application's interface.

-   **Email:** `tony@mail.com` | **Password:** `password123`
-   **Email:** `vivi@mail.com` | **Password:** `password123`

_Note: Passwords are securely hashed using bcrypt._

---

## 📁 Project Structure

The repository is organized into a standard monorepo structure for a full-stack application.

```
/
├── backend/          # NestJS API source code and Dockerfile
│   └── README.md     # Detailed backend documentation
├── frontend/         # React SPA source code and Dockerfile
│   └── README.md     # Detailed frontend documentation
├── docker-compose.yml  # Defines all application services (db, api, client)
├── start.sh          # The main script to launch the application
└── README.md         # You are here! (This file)
```

For detailed information about the frontend or backend architecture, API endpoints, and available scripts for local development (without Docker), please refer to the `README.md` files located within their respective directories.

---

## 🔮 Live Demo

<!--
**ACTION:** Link to deployed app: [Live URL Here]
-->

---

## 👨‍💻 Author

-   **Name:** Antonio Santiago
-   **GitHub:** [TonyS-dev](https://github.com/TonyS-dev)
-   **Email:** santiagor.acarlos@gmail.com
