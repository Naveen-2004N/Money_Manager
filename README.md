<div align="center">

# 💰 Money Manager

**A full-stack personal finance and expense tracking web application built with Spring Boot 3.5, React 19, and MySQL.**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  Money Manager provides users with real-time financial tracking, intuitive category-based budgeting, insightful visual trend analytics with interactive charts, and multi-criteria transaction filtering.
</p>

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Getting Started (Local)](#-getting-started-local)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup-spring-boot)
  - [2. Frontend Setup](#2-frontend-setup-react--vite)
- [Docker Deployment](#-docker-deployment)
- [Cloud Deployment (Render & Vercel)](#-cloud-deployment-render--vercel)
  - [Architecture Overview](#architecture-overview)
  - [Step 1: PostgreSQL on Render](#step-1-create-postgresql-database-on-render)
  - [Step 2: Backend on Render](#step-2-deploy-backend-web-service-on-render)
  - [Step 3: Frontend on Vercel](#step-3-deploy-frontend-on-vercel)
- [API Reference](#-api-reference)
- [Security & Authentication](#-security--authentication)
- [License](#-license)

---

## ✨ Features

- 📊 **Real-time Financial Dashboard**
  - Instant summary cards: **Total Balance**, **Total Income**, and **Total Expenses**.
  - **Financial Overview Donut Chart** displaying category-wise spending distribution.
  - **Area Trend Charts** plotting monthly income vs. expense cash flows using Recharts.
  - Recent transactions list with dynamic color coding (+ green for income, - red for expenses).

- 💵 **Income & Expense Management**
  - Record incomes and expenses with title, amount, date, and category attribution.
  - Instant balance updates upon transaction additions and deletions.
  - Export transactions to Excel/CSV spreadsheet reports.

- 🏷️ **Dynamic Category System**
  - Create, customize, and edit custom categories for both Income and Expenses.
  - Interactive emoji/icon picker for quick visual identification.

- 🔍 **Advanced Transaction Filtering**
  - Multi-criteria filtering by transaction type (`All`, `Income`, `Expense`).
  - Date-range selection (Start Date to End Date).
  - Real-time keyword search across titles and notes.
  - Flexible sorting by date or amount in ascending/descending order.

- 👤 **User Profiles & Authentication**
  - Secure stateless **JWT (JSON Web Token)** authentication.
  - BCrypt password hashing for industry-standard credential safety.
  - Custom profile picture upload supporting high-resolution avatars via Base64 `LONGTEXT` storage.
  - Seamless auto-activation upon registration.

- 🎨 **Modern Responsive UI**
  - Clean, glassmorphic layout styled with Tailwind CSS.
  - Animated toast notifications powered by React Hot Toast.
  - Fully responsive design optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 (Functional Components & Hooks)
- **Bundler & Tooling**: Vite 8, PostCSS, Oxlint
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 3.4
- **Charts & Data Visualization**: Recharts 3.11
- **Icons**: Lucide React
- **HTTP Client**: Axios with JWT Interceptors
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

### Backend
- **Framework**: Spring Boot 3.5.3 (Java 21)
- **Security**: Spring Security 6 with JWT (`io.jsonwebtoken` 0.11.5)
- **ORM & Data**: Spring Data JPA & Hibernate
- **Database Connector**: MySQL Connector/J & PostgreSQL runtime support
- **Spreadsheet Generation**: Apache POI (OOXML 5.2.5)
- **Boilerplate Reduction**: Project Lombok
- **Containerization**: Multi-stage Dockerfile (Eclipse Temurin 21 JRE)

### Database
- **Primary / Local**: MySQL 8.0+
- **Production / Cloud**: PostgreSQL

---

## 📁 Project Structure

```text
Money_Manager/
├── backend/
│   ├── DockerFile                               # Multi-stage Docker container build
│   ├── mvnw / mvnw.cmd                          # Maven wrapper binaries
│   ├── pom.xml                                  # Maven dependencies and configuration
│   └── src/
│       ├── main/
│       │   ├── java/com/kp/moneyManager/
│       │   │   ├── MoneyManagerApplication.java # Spring Boot entry point
│       │   │   ├── config/                      # Security & CORS configuration
│       │   │   ├── controller/                  # REST API controllers
│       │   │   ├── dto/                         # Data Transfer Objects
│       │   │   ├── entity/                      # JPA Entities (Profiles, Categories, etc.)
│       │   │   ├── repository/                  # Spring Data JPA repositories
│       │   │   ├── security/                    # JWT authentication filter
│       │   │   ├── service/                     # Business logic and services
│       │   │   └── util/                        # Exceptions and JWT helper utilities
│       │   └── resources/
│       │       ├── application.properties       # Default local configuration (MySQL)
│       │       └── application-prod.properties  # Production configuration (PostgreSQL)
│       └── test/                                # JUnit test suites
├── frontend/
│   ├── index.html                               # HTML template
│   ├── package.json                             # Dependencies & scripts
│   ├── vite.config.js                           # Vite build configuration
│   ├── tailwind.config.js                       # Tailwind CSS styling configuration
│   ├── vercel.json                              # SPA routing rewrite rule
│   ├── .env.example                             # Environment variable template
│   └── src/
│       ├── App.jsx                              # Route definitions & theme provider
│       ├── main.jsx                             # React DOM entry point
│       ├── api/                                 # Axios instances and API services
│       ├── components/                          # Reusable UI components (Sidebar, Header, etc.)
│       ├── context/                             # AuthContext for global user state
│       └── pages/                               # Dashboard, Income, Expenses, Categories, etc.
└── README.md                                    # Project documentation
```

---

## 🗄️ Database Schema

The application uses an automatic JPA schema mapping (`ddl-auto=update`):

```mermaid
erDiagram
    PROFILES ||--o{ CATEGORIES : "creates"
    PROFILES ||--o{ INCOMES : "records"
    PROFILES ||--o{ EXPENSES : "incurs"
    CATEGORIES ||--o{ INCOMES : "categorizes"
    CATEGORIES ||--o{ EXPENSES : "categorizes"

    PROFILES {
        bigint id PK
        varchar full_name
        varchar email UK
        varchar password
        longtext profile_image_url
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    CATEGORIES {
        bigint id PK
        varchar name
        varchar type
        varchar icon
        bigint profile_id FK
        datetime created_at
        datetime updated_at
    }

    INCOMES {
        bigint id PK
        varchar name
        double amount
        date date
        bigint category_id FK
        bigint profile_id FK
        datetime created_at
        datetime updated_at
    }

    EXPENSES {
        bigint id PK
        varchar name
        double amount
        date date
        bigint category_id FK
        bigint profile_id FK
        datetime created_at
        datetime updated_at
    }
```

---

## 🚀 Getting Started (Local)

### Prerequisites

- **Java Development Kit (JDK)**: Version 21 or higher
- **Node.js**: Version 18.x or higher and `npm`
- **MySQL Server**: Version 8.0 or higher
- **Git**

---

### 1. Backend Setup (Spring Boot)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Configure Database Connection**:
   Check `src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/moneymanager?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```

3. **Build and Run**:
   - **On Windows**:
     ```powershell
     .\mvnw.cmd clean spring-boot:run
     ```
   - **On macOS / Linux**:
     ```bash
     chmod +x mvnw
     ./mvnw clean spring-boot:run
     ```

   The backend will start at `http://localhost:8080/api/v1.0`.

---

### 2. Frontend Setup (React + Vite)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `VITE_API_BASE_URL=http://localhost:8080/api/v1.0`)*

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Visit **`http://localhost:5173`** to access the application.

---

## 🐳 Docker Deployment

The backend includes a multi-stage Dockerfile for fast, containerized deployment.

1. **Build the Docker Image**:
   ```bash
   cd backend
   docker build -t moneymanager-backend:latest -f DockerFile .
   ```

2. **Run the Container**:
   ```bash
   docker run -d -p 8080:8080 \
     -e SPRING_PROFILES_ACTIVE=prod \
     -e MONEY_MANAGER_POSTGRESQL_URL="jdbc:postgresql://host.docker.internal:5432/moneymanager" \
     -e MONEY_MANAGER_POSTGRESQL_USERNAME="postgres" \
     -e MONEY_MANAGER_POSTGRESQL_PASSWORD="your_password" \
     --name moneymanager-api moneymanager-backend:latest
   ```

---

## 🌐 Cloud Deployment (Render & Vercel)

### Architecture Overview

| Component | Recommended Platform | Type | Free Tier |
|---|---|---|:---:|
| **Database** | [Render](https://render.com) | Managed PostgreSQL | ✅ |
| **Backend API** | [Render](https://render.com) | Docker Web Service | ✅ |
| **Frontend UI** | [Vercel](https://vercel.com) *(or Render)* | Vite SPA Static Site | ✅ |

---

### Step 1: Create PostgreSQL Database on Render

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **PostgreSQL**.
3. Configure the database:
   - **Name**: `moneymanager-db`
   - **Database**: `moneymanager`
   - **User**: `moneymanager_user`
   - **Region**: Choose the closest region (e.g. `Oregon`)
   - **Plan**: `Free`
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (for example: `postgres://moneymanager_user:secret@dpg-xxx:5432/moneymanager`).
   - Note: In Spring Boot JDBC, prepend `jdbc:` to the URL: `jdbc:postgresql://moneymanager_user:secret@dpg-xxx:5432/moneymanager`

---

### Step 2: Deploy Backend Web Service on Render

1. On Render Dashboard, click **New +** → **Web Service**.
2. Connect your GitHub repository: `https://github.com/Naveen-2004N/Money_Manager.git`.
3. Configure settings:
   - **Name**: `moneymanager-backend`
   - **Region**: Select the same region as your database (e.g. `Oregon`)
   - **Root Directory**: `backend`
   - **Runtime / Environment**: `Docker`
   - **Dockerfile Path**: `DockerFile`
   - **Instance Type**: `Free`
4. Expand **Advanced** → **Add Environment Variables**:
   | Key | Value |
   |---|---|
   | `SPRING_PROFILES_ACTIVE` | `prod` |
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://<host>:5432/moneymanager` *(from Step 1)* |
   | `SPRING_DATASOURCE_USERNAME` | `<db-user>` *(from Step 1)* |
   | `SPRING_DATASOURCE_PASSWORD` | `<db-password>` *(from Step 1)* |
5. Click **Deploy Web Service**.
6. When deployment finishes, note down your backend public URL (e.g., `https://moneymanager-backend.onrender.com`).
   - Verify by visiting: `https://moneymanager-backend.onrender.com/api/v1.0/health` (returns *"Running Successfully"*).

---

### Step 3: Deploy Frontend on Vercel

1. Log into [Vercel](https://vercel.com).
2. Click **Add New...** → **Project** and import your repository: `Naveen-2004N/Money_Manager`.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select **`frontend`**.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://<your-render-backend-url>.onrender.com/api/v1.0`
5. Click **Deploy**.
6. Your Money Manager frontend is now live with global edge CDN, automatic HTTPS, and SPA routing!

*(Alternative: You can also deploy the frontend on Render as a **Static Site** by setting Root Directory to `frontend`, Build Command to `npm run build`, and Publish Directory to `dist`)*

---

## 📡 API Reference

Base URL: `http://localhost:8080/api/v1.0`

### Authentication & User

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/register` | Register a new user profile | ❌ |
| `POST` | `/login` | Authenticate user & return JWT token | ❌ |
| `POST` | `/reset-password` | Update account password | ❌ |
| `GET` | `/health` / `/status`| Backend health check | ❌ |

### Dashboard & Analytics

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/dashboard` | Fetch total balance, monthly totals, chart trends & recent records | ✅ |

### Categories

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/categories` | Get all categories for logged-in user | ✅ |
| `GET` | `/categories/{type}` | Get categories filtered by type (`income` / `expense`) | ✅ |
| `POST` | `/categories` | Create a new custom category with icon | ✅ |
| `PUT` | `/categories/{id}` | Update existing category | ✅ |

### Incomes

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/incomes` | Get current month income transactions | ✅ |
| `POST` | `/incomes` | Record a new income | ✅ |
| `DELETE` | `/incomes/{id}` | Delete income record by ID | ✅ |

### Expenses

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/expenses` | Get current month expense transactions | ✅ |
| `POST` | `/expenses` | Record a new expense | ✅ |
| `DELETE` | `/expenses/{id}` | Delete expense record by ID | ✅ |

### Filtering & Search

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/filter` | Filter transactions by type, date range, keyword, & sort order | ✅ |

---

## 🔒 Security & Authentication

- **Stateless Architecture**: Client sends the JWT token in the `Authorization: Bearer <TOKEN>` header with each request.
- **`JwtRequestFilter`**: Validates token claims and populates the `SecurityContext` on authenticated routes.
- **CORS Protection**: Configured via `CorsConfig` allowing secure cross-origin communication between the frontend (`http://localhost:5173`) and backend APIs.
- **Password Security**: Passwords are encrypted before persisting into the database using Spring Security's `BCryptPasswordEncoder`.

---

## 📄 License

This project is open-source and available under the MIT License.
