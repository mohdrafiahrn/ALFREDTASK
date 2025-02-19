# Flashcard Learning App with Leitner System

## Introduction

This is a Flashcard Learning App built using the MERN stack (MongoDB, Express, React, Node.js) that implements the **Leitner System** for spaced repetition learning. Users can create, review, and progress through flashcards based on their learning performance.

## Features

### Backend (Node.js, Express, MongoDB, Mongoose)

- **REST API Endpoints:**
  - `POST /flashcards` → Add a new flashcard
  - `GET /flashcards` → Get all flashcards
  - `PUT /flashcards/:id` → Update flashcard (move to next level if correct)
  - `DELETE /flashcards/:id` → Delete a flashcard
- **Leitner System Logic:**
  - Flashcards start in Box 1.
  - Correct answers move them to the next box.
  - Incorrect answers return them to Box 1.
  - Higher boxes have longer review intervals (spaced repetition).
- **Database Schema:**
  - Flashcard level (box number)
  - Question and answer
  - Next review date

### Frontend (React, React Hooks, Axios, Tailwind/Bootstrap)

- Display flashcards with options:
  - "Show Answer" button
  - "Got it Right" and "Got it Wrong" buttons
- Update flashcard level based on user response
- Fetch flashcards based on their next review date (spaced repetition logic)
- Show progress (e.g., "You have 5 flashcards due today")
- Simple & clean UI with minimal distractions.



## Installation & Setup

### Prerequisites

- Node.js
- MongoDB (Atlas or local instance)
- Git

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ALFREDTASK.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd ALFREDTASK/backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add your MongoDB connection string:
   ```env
   MONGODB_URI=your-mongodb-uri
   PORT=5000
   ```
5. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your backend API URL:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## Deployment

### Backend (Render)

1. Push your backend code to GitHub.
2. Create a new [servic](https://render.com/)e on [Render](https://render.com/).
3. Connect your GitHub repository and deploy.
4. Add environment variables (MongoDB URI, etc.).

### Frontend (Vercel)

1. Push your frontend code to GitHub.
2. Create a new [projec](https://vercel.com/)t on [Vercel](https://vercel.com/).
3. Connect your GitHub repository and deploy.
4. Add environment variables (`VITE_API_URL`).

## Evaluation Criteria

- Code Quality & Best Practices
- Leitner System Implementation
- UI/UX Simplicity & Usability
- Proper API Integration & State Management

Live Demo Link : https://alfredtask-sigma.vercel.app/

Github Link : https://github.com/mohdrafiahrn/ALFREDTASK

