# E-Hospital

This project is a Request Management System developed using the MERN (MongoDB, Express, React, Node.js) stack with TypeScript. The system features a responsive design, a functional navigation bar, and complete CRUD operations with a focus on GET, POST, PATCH, and DELETE methods.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Integration](#integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive Navbar with active state highlighting and dropdown menu for Settings.
- Responsive circles displaying the status counts of requests.
- Request Table with details, filters for status and department, and badges for status and priority.
- Form to add/edit requests with necessary validation.
- Mobile responsiveness for all UI components.
- CRUD operations with a focus on GET, POST, PATCH, and DELETE methods.

## Requirements

- Node.js
- MongoDB
- React
- TypeScript

## Installation

### Backend

1. Clone the repository:
   
   git clone https://github.com/Dinnusha-hue/E-Hospital.git
   cd request-management-system/backend

2. Install dependancies
     npm install
   
3. Start frontend development server
     npm start

4. Start backend development server
     npm run dev



### .env file content
   PORT=5000
   MONGO_URI=mongodb+srv://dinushaweerasekara312:Dinu123@request-db.nd2ihkf.mongodb.net/?retryWrites=true&w=majority&appName=request-db
