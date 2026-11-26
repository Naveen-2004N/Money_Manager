<div align="center">
  
# 💰 MoneyMind - Full Stack Financial Manager 🚀

*A complete, modern personal finance management system built with Spring Boot, React, and MySQL.*

[![Java](https://img.shields.io/badge/Java-21-blue?logo=openjdk)](https://openjdk.org)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-latest-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)](https://www.mysql.com)

</div>

---

## 🌟 Key Features

- 🔐 **Secure Authentication**: JWT-based login & registration with email activation support.
- 📊 **Interactive Dashboard**: Real-time balance calculations, monthly trends using Recharts (Area charts & Donut distribution).
- 💵 **Income & Expense Tracking**: Record transactions with category linking, custom emoji icons, dates, and amounts.
- 🏷️ **Category Management**: Create and customize income and expense categories with custom icons.
- 🔍 **Advanced Filtering**: Filter transactions by type (income/expense), search keyword, date range, and sort order.
- 📱 **Responsive Design**: Modern glassmorphic dark theme, responsive sidebar navigation, mobile drawer support, and toast alerts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Recharts, Lucide React, React Hot Toast, Axios, Date-fns |
| **Backend** | Java 21, Spring Boot 3.5, Spring Security, JWT (`io.jsonwebtoken`), Spring Data JPA, Hibernate, Apache POI |
| **Database** | MySQL 8.0+ |

---

## 🚀 Getting Started

### Prerequisites

- **Java JDK 21+**
- **Node.js 18+** & npm
- **MySQL Server** (running locally on port 3306)

---

### 1. Database Setup

Create the MySQL database (or let Hibernate auto-create it with `createDatabaseIfNotExist=true`):

```sql
CREATE DATABASE IF NOT EXISTS moneymanager;
```

Update your MySQL credentials in [application.properties](file:///c:/Users/LENOVO/OneDrive/Desktop/ResumeProjects/Money_Manager/money-manager-backend/src/main/resources/application.properties):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/moneymanager?createDatabaseIfNotExist=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

### 2. Run Backend (Spring Boot)

Navigate to the backend directory and run:

```bash
cd money-manager-backend

# Using Maven Wrapper (Windows PowerShell)
.\mvnw.cmd spring-boot:run

# Or build the jar
.\mvnw.cmd clean package -DskipTests
java -jar target/moneyManager-0.0.1-SNAPSHOT.jar
```

The backend server starts on **`http://localhost:8080/api/v1.0`**.

---

### 3. Run Frontend (React + Vite)

Navigate to the frontend directory:

```bash
cd money-manager-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be live at **`http://localhost:5173`**.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1.0/register` | User registration |
| `POST` | `/api/v1.0/login` | User login & JWT issuance |
| `GET` | `/api/v1.0/activate?token=...` | Account activation |
| `GET` | `/api/v1.0/dashboard` | Dashboard metrics & recent activity |
| `GET` | `/api/v1.0/incomes` | Current month incomes |
| `POST` | `/api/v1.0/incomes` | Add new income |
| `DELETE` | `/api/v1.0/incomes/{id}` | Delete income |
| `GET` | `/api/v1.0/expenses` | Current month expenses |
| `POST` | `/api/v1.0/expenses` | Add new expense |
| `DELETE` | `/api/v1.0/expenses/{id}` | Delete expense |
| `GET` | `/api/v1.0/categories` | User categories |
| `POST` | `/api/v1.0/categories` | Create custom category |
| `PUT` | `/api/v1.0/categories/{id}` | Update category |
| `POST` | `/api/v1.0/filter` | Search & filter transactions |

---

## 🔒 Postman Collection
- [Postman API Collection](https://kp8888-5028.postman.co/workspace/My-Workspace~6c744855-0977-40fe-8721-262165c91e7b/collection/37531972-fc230055-720c-4436-b408-2f894df1e234?action=share&creator=37531972)

---

## 📄 License
This project is licensed under the MIT License.
