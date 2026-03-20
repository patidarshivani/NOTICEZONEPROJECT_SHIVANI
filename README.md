# 📢 NoticeZone – Role-Based College Notice Management System

A full-stack web application designed to manage and distribute college notices efficiently with secure role-based access control.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 👥 Role-based access (Admin, Professor, HOD, Student)
- 📢 Admin-wide announcements visible to all users
- 🏫 Department-specific notices for faculty and students
- 🧾 Secure REST APIs using Spring Boot
- ⚡ Real-time UI updates using React
- 🔄 Centralized notice management system

---

## 🏗️ Architecture

- **Frontend:** React.js  
- **Backend:** Spring Boot (Java)  
- **Security:** Spring Security + JWT  
- **Database:** MySQL  
- **API Communication:** REST APIs (Axios)

---

## 🔐 How Authentication Works

1. User logs in with credentials  
2. Backend verifies and generates JWT  
3. Token is stored in frontend (localStorage)  
4. Token is sent with every request in Authorization header  
5. Backend validates token using JwtFilter  

---

## 👥 Roles & Access

| Role        | Permissions |
|------------|------------|
| Admin       | Add global notices, manage all data |
| Professor   | Add department-specific notices |
| HOD         | View/manage department notices |
| Student     | View notices only |

---

## 📌 Key Concepts Implemented

- Role-Based Access Control (RBAC)
- JWT Authentication
- REST API Design
- Secure Backend Validation
- Entity Relationships (JPA/Hibernate)
- Separation of Concerns (Frontend vs Backend)

---

## 🧠 Learning Outcomes

- Implemented real-world authentication and authorization
- Debugged security issues (401 vs 403 errors)
- Designed scalable backend architecture
- Integrated frontend and backend effectively

---


### 🔹 Backend (Spring Boot)

```bash
git clone https://github.com/patidarshivani/NOTICEZONEPROJECT_SHIVANI/backend
cd backend

---

### 🔹 Frontend (React)

```bash
git clone https://github.com/your-username/noticezone-frontend
cd noticezone-frontend
npm install
npm run dev


👉 This will automatically appear as a new section.

---

## 🔹 2️⃣ Add MySQL configuration (IMPORTANT)

Below backend section (or inside it), add:

```md
### Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
