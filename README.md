# Expense Tracker API

Expense Tracker API is a backend service built with **NestJS** and **MongoDB** that provides RESTful APIs for managing expenses. The project follows a modular and scalable architecture and is designed to be extended with authentication, authorization, and advanced financial features.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework
- **TypeScript** – Type-safe development
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **PNPM** – Fast package manager
- **Class Validator** – Request validation

---

## ✨ Features

- Expense CRUD operations
- Modular folder structure
- DTO-based validation
- Environment-based configuration
  src/
  ├── app.module.ts
  ├── app.controller.ts
  ├── app.service.ts
  ├── main.ts
  ├── expenses/ # Expense module
  │ ├── dto/
  │ ├── entities/
  │ ├── expenses.controller.ts
  │ ├── expenses.module.ts
  │ └── expenses.service.ts
  ├── common/ # Shared utilities
  │ └── filters/
  │ └── global-exception.filter.ts
  └── config/ # Configuration
  ├── database.config.ts
  └── index.ts

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 4.4+
- PNPM 8+

### Installation

```bash
pnpm install
````

### Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
```

### Run Development Server

```bash
pnpm run start:dev
```

### Run Production Build

```bash
pnpm run build
pnpm run start:prod
```

---

## 📝 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Expenses

#### Create Expense

```http
POST /api/expenses
```

**Request Body:**

```json
{
  "title": "Groceries",
  "amount": 50.75,
  "category": "Food",
  "date": "2024-01-19T10:00:00.000Z"
}
```

**Response:**

```json
{
  "id": "65a9f4e2c3d4e5f6a7b8c9d0",
  "title": "Groceries",
  "amount": 50.75,
  "category": "Food",
  "date": "2024-01-19T10:00:00.000Z",
  "createdAt": "2024-01-19T10:00:00.000Z",
  "updatedAt": "2024-01-19T10:00:00.000Z"
}
```

#### Get All Expenses

```http
GET /api/expenses
```

**Response:**

```json
[
  {
    "id": "65a9f4e2c3d4e5f6a7b8c9d0",
    "title": "Groceries",
    "amount": 50.75,
    "category": "Food",
    "date": "2024-01-19T10:00:00.000Z",
    "createdAt": "2024-01-19T10:00:00.000Z",
    "updatedAt": "2024-01-19T10:00:00.000Z"
  }
]
```

#### Get Expense by ID

```http
GET /api/expenses/:id
```

#### Update Expense

```http
PATCH /api/expenses/:id
```

#### Delete Expense

```http
DELETE /api/expenses/:id
```

---

## 🧪 Testing

### Unit Tests

```bash
pnpm run test
```

### E2E Tests

```bash
pnpm run test:e2e
```

---

## 🔐 Authentication (Future)

This project is ready for JWT authentication. To add it:

1. Install dependencies:

```bash
pnpm add @nestjs/jwt passport passport-jwt bcryptjs
```

2. Create AuthModule and JWT strategy
3. Add authentication guards
4. Implement user registration and login

---

## 📊 Database

### MongoDB Connection

The database connection is configured in `src/config/database.config.ts`.

### Models

- **Expense**: `src/expenses/entities/expense.entity.ts`

---

## 🛠️ Development

### Code Style

```bash
pnpm run lint
```

### Formatting

```bash
pnpm run format
```

---

## 🚀 Deployment

### Docker

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
```
