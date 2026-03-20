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


## 🚀 Installation & Setup

### 🔹 1. Backend (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/patidarshivani/NOTICEZONEPROJECT_SHIVANI.git
   cd backend

2. **Configure MySQL Database** Open `src/main/resources/application.properties` and update the following lines with your local MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   # This line automatically creates the tables in your database
   spring.jpa.hibernate.ddl-auto=update
---

### 3. Install Dependencies & Build
You can do this in two ways:

* **Option A (Using Terminal):**
    Run this command in the `backend` folder:
    ```bash
    mvn clean install
    ```
* **Option B (Using IntelliJ/Eclipse):**
    Right-click on your project in the sidebar, go to **Maven**, and click **"Reload Project"** or **"Update Project"**. This will download all the JAR files needed for the project.

---

## 🔹 Frontend (React)
      git clone https://github.com/patidarshivani/NOTICEZONEPROJECT_SHIVANI.git
      cd frontend
      npm install
      npm run dev

---

## 📦 Tech Stack

- Java  
- Spring Boot  
- Spring Security (JWT)  
- MySQL  
- React.js  
- Axios  


## 💡 Future Improvements

- Email notifications for new notices  
- File upload support for notices  
- Pagination and search functionality  
- Deployment using AWS / Docker


## 👤 Author

**Shivani Patidar**  

- GitHub: https://github.com/patidarshivani  
- LinkedIn: https://linkedin.com/in/shivani-patidar-067b50228  
