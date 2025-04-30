# Task Manager - Backend

This is the **backend** codebase for the Task Manager web application. It provides API endpoints to manage tasks, handle user authentication, and interact with the database. This project is built using **Node.js** and **Express**.

> 🔗 Frontend Repository: [taskmanager_frontend](https://github.com/Rishabh7068/taskmanager_frontend)

---

## 🚀 Features

- User authentication (JWT-based)
- CRUD operations for tasks
- Email verifications
- Integration with MongoDB for data storage

---

## 🛠️ Tech Stack

- **Node.js** & **Express**
- **MongoDB** for database
- **JWT** for authentication
- **Nodemailer** for email sending
- **dotenv** for environment variable management

---

## 📦 Getting Started

Follow these steps to run the backend project locally:

### 1. Clone the repository


git clone git@github.com:Rishabh7068/taskmanager_backend.git

npm install

3. Create the .env file
In the root directory, create a .env file and add the following content:

PORT=9000
JWT="W3VillaAssignment"
MONGO_URI="" # Insert your MongoDB connection string here
EMAIL_USER="" # Your Gmail address
EMAIL_PASS="" # Your Gmail app password


4. Create Nodemailer app and generate app password
To send emails from your Gmail account using Nodemailer, follow these steps:

Go to your Google Account.

Navigate to Security and enable 2-Step Verification if not already enabled.

Once 2-Step Verification is enabled, create an App Password for Nodemailer (16-digit password).

Insert the generated password into the EMAIL_PASS field in the .env file.

npm run dev
