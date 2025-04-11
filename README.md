# CPS406 Cypress

A web-based platform for reporting and tracking street-related issues within the City of Toronto. This application was developed as part of the CPS406 Software Engineering course.

## 🚀 Project Overview

Cypress allows Toronto residents to easily report issues like potholes, streetlight outages, or damaged sidewalks. City officials can track, update, and manage these reports through a streamlined interface.

## 🛠️ Features

- **User Authentication**: Sign up, log in, and manage your account.
- **Report Submission**: Submit new street issues with details like description, photo, and location.
- **Report Tracking**: View the status of your reports: _Pending_, _In Progress_, or _Resolved_.
- **Admin Interface**: City officials can view, filter, and update report statuses.

## 🧑‍💻 Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Styling: Tailwind CSS
- Other: Map API integration for location tracking

## 📦 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/benny70712/CPS406-Cypress.git
    ```

2. Navigate into the project directory:

    ```bash
    cd CPS406-Cypress
    ```

3. Set up environment variables for the backend:

    - The `.env.example` file is located in the `Backend` folder.
    - Copy it and rename it to `.env`:

    ```bash
    cd Backend
    cp .env.example .env
    ```

4. Open the new `.env` file and provide the required values:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    > 📝 Make sure `MONGO_URI` is a valid MongoDB connection string and `JWT_SECRET` is a secure string used for token authentication.

5. Install dependencies and run the backend:

    ```bash
    npm install
    npm run dev
    ```

6. Open a new terminal window and start the frontend:

    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
