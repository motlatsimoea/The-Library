# The Library

## Introduction

The Library is a simple project that allows users to upload and download novels. It also features a comment section for users to discuss books. The main functionalities include:

- User registration
- Login/logout
- Book uploads with cover page, synopsis, genre(s), PDF, and author
- User profiles
- Comment section
- Notifications

Please note that the project is still in its early stages, and additional functionality will be added as development progresses.

my_project/
├── frontend/
│   ├── # Frontend project files and directories
├── backend/
│   ├── # Backend project files and directories
├── README.md

This repository has two main folders: 'frontend' and 'backend', in addition to this README file.

### Frontend

The frontend of this library was developed using ReactJS. The folder structure includes:

frontend/
├── node_modules/
│   ├── # Node.js modules and dependencies
│   │   ├── ...
├── public/
│   ├── # Public assets (HTML, images, etc.)
│   │   ├── ...
├── src/
│   │   ├── components/
│   │   │   ├── # React components
│   │   │   │   ├── ...
│   │   ├── features/
│   │   │   ├── # Features-related code
│   │   │   │   ├── ...
│   │   ├── screens/
│   │   │   ├── # Screen components
│   │   │   │   ├── ...
│   │   ├── utils/
│   │   │   ├── # Utility functions
│   │   │   │   ├── ...
│   │   ├── App.js
│   │   ├── bootstrap.min.css
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── store.js
├── .gitignore
├── package-lock.json
├── package.json


- **src**: Contains various 'pages' or components used in the frontend. These components are designed to handle specific functionalities.

- **Utils**: Contains components for private routes and handling token refresh for persistent login.

- **Features**: Contains code for managing asynchronous data communication using Axios, Redux reducers, and actions for global state management using the Redux Toolkit.

- **App.js**: Defines the project's routes.

#### HTML and CSS

The project uses Bootstrap themes, CSS, and HTML templates, which have been modified to suit the project's requirements. The interface is a work in progress, and responsiveness is yet to be implemented.

### Backend

The backend of this project was built using Django and Django Rest Framework. It consists of three apps:

backend/
├── backend/
│   ├── # backend application files and directories
│   │   ├── ...
├── books/
│   ├── # books-related files and directories
│   │   ├── ...
├── media/
│   ├── # Your media-related files and directories
│   │   ├── ...
├── notifications/
│   ├── # notifications-related files and directories
│   │   ├── ...
├── users/
│   ├── # users-related files and directories
│   │   ├── ...
├── .gitignore
├── db.sqlite3
├── manage.py
├── requirements.txt


- **Books**: Manages models, views, URLs, and serializers related to books/novels.

- **Users**: Similar to the 'books' app but for user-related functionalities.

- **Notifications**: Handles notifications in the project.

The backend functions as an API using Django Rest Framework, enabling data exchange between the backend and frontend. Data is serialized, and connections between models are appropriately managed, including many-to-many relationships.

## Authentication

Authentication in this project is handled using JSON Web Tokens (JWT). Access tokens are refreshed every 4 minutes using the refresh token to keep users logged in.

## Project Discussion

This project has been a valuable learning experience, improving skills in ReactJS, Redux, and Django Rest Framework. Key lessons and challenges include:

- Passing props between components
- Using React hooks like useState() and useEffect()
- Exploring global state management with Redux Toolkit
- Data serialization and using serializers for CRUD operations
- Managing many-to-many fields, like the 'genre' field in book uploads.

## Biggest Challenge

A significant challenge was handling the many-to-many field for book genres during uploads. It required intercepting and extracting the genre field before validation. Extensive research and debugging were needed to overcome this challenge.

## Journey So Far

Key achievements include:

- User registration with automatic profile setup
- User login and persistent login
- Book uploads

Please feel free to correct any grammatical errors and improve the clarity of the text.
