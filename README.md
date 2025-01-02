
# MERN Task Manager App

## Overview

A simple Task Manager application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The app allows users to create, read, update, and delete tasks. It includes a user-friendly UI/UX with a dark mode toggle.

### Features
- Add new tasks.
- View the list of tasks.
- Edit existing tasks.
- Delete tasks.
- Responsive UI with Material-UI integration.
- Dark mode support.

### Technologies Used

#### Frontend
- **React.js**: For building the user interface.
- **Material-UI**: For styling and responsive design.
- **Axios**: For making HTTP requests to the backend.

#### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For API routing.
- **Mongoose**: For MongoDB object modeling.

#### Database
- **MongoDB**: For storing tasks.

---

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running locally or a MongoDB Atlas account.

### Clone the Repository
```bash
$ git clone https://github.com/omerxhafique/todo-app-mern.git
$ cd todo-app-mern
```

### Install Dependencies

#### Backend
```bash
$ cd backend
$ npm install
```

#### Frontend
```bash
$ cd ../frontend
$ npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` folder with the following content:
```plaintext
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```
Replace `<your-mongodb-connection-string>` with your MongoDB URI.

---

## Running the Application

### Start Backend Server
```bash
$ cd backend
$ npm run dev
```

### Start Frontend Server
```bash
$ cd frontend
$ npm start
```
The frontend will run on `http://localhost:3000`, and the backend API will be available at `http://localhost:5000`.

---

## API Endpoints

**Base URL:** `http://localhost:5000/api/tasks`

- **GET /api/tasks**: Fetch all tasks.
- **POST /api/tasks**: Create a new task.
  - Body: `{ "title": "Task Title" }`
- **PUT /api/tasks/:id**: Update a task.
  - Body: `{ "title": "Updated Task Title" }`
- **DELETE /api/tasks/:id**: Delete a task.

---

## Folder Structure
```
mern-task-manager/
├── backend/
│   ├── models/
│   │   └── Task.js      # Mongoose model for tasks
│   ├── routes/
│   ├── server.js        # Express server
│   └── .env.example     # Example environment file
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main React app
│   │   └── index.js     # React entry point
│   └── public/
├── README.md
└── package.json         # Project metadata
```

---

## Enhancements
- **Validation**: Add form validation for better error handling.
- **User Authentication**: Integrate user authentication for personal task management.
- **Deployment**: Deploy the app on a cloud platform (e.g., AWS, Heroku, or Vercel).

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License.

Feel free to reach out with any questions or suggestions!
