# Xlab

*Overview: -

xLab is a single-page web application (SPA) designed to streamline task management and project oversight within an organization. Built using HTML, TailwindCSS, ReactJS, and it leverages Firebase for authentication, image storage, and a NoSQL database. xLab provides an intuitive platform for administrators to manage employees, assign tasks, and track project progress.

# Screenshots

![Screenshot (667)](https://github.com/user-attachments/assets/392df1af-377d-4e9c-99b5-23c02912c5d8)
![Screenshot 2024-09-01 195430](https://github.com/user-attachments/assets/c6a78c6f-fc7a-4b1b-9a71-707123ce9ea0)
![Screenshot 2024-09-01 195411](https://github.com/user-attachments/assets/fdbecadb-1aa0-4447-a0db-27dbcc51593c)
![Screenshot 2024-09-01 195218](https://github.com/user-attachments/assets/fd639766-8599-4c7b-9ac1-793ba0cb9fcb)
![Screenshot 2024-09-01 195155](https://github.com/user-attachments/assets/0ff91761-2130-4e11-bee6-ad7cb684dab8)
![Screenshot 2024-09-01 195131](https://github.com/user-attachments/assets/c6136acf-a343-4121-9c63-56cf6c5821e2)

# Features: -

**Admin Panel: -
- Employee Management: -
Add, update, or deactivate employees.
Assign tasks with deadlines and priorities to any employee.
Create, read, update, and delete project data.
Track employee progress and task completion.
Deactivate an employee to restrict login access.

- Task Management:
Assign tasks with specific deadlines and priorities.
Monitor task status updates from employees.
Track the overall progress of projects through the dashboard.
Project Management:
Perform CRUD (Create, Read, Update, Delete) operations on projects.
Organize tasks under specific projects for better management.

**Employee Dashboard
- Task Management: -
View assigned tasks with details such as deadline and priority.
Update the status of tasks to reflect progress.
Raise issues or seek help if stuck on a task.

- Personal Management: -
Update personal details within the system (restricted to certain fields).
Technology Stack
Frontend: HTML, TailwindCSS, ReactJS
Backend: Firebase Authentication, Firebase Firestore (NoSQL Database), Firebase Storage (for image storage)

# Installation
*To run this project locally:

- Clone the repository:

git clone https://github.com/your-username/xLab.git

Navigate to the project directory:
cd xLab

Install the required dependencies:
npm install

- Set up Firebase:

Create a Firebase project.
Enable Authentication, Firestore, and Storage.
Replace the Firebase configuration in the project with your own.

Start the development server:
npm run dev

# Usage
Admins can log in, manage employees, and oversee projects from the admin panel.
Employees can log in to view and update their task status, as well as raise any issues.

