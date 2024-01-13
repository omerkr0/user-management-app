# User-Management-App

This project is a simple user management application developed using Next.js, TypeScript, Tailwind CSS, and Go. User records are managed using an SQLite database.

## Getting Started

Follow the steps below to install project dependencies:

1. **Frontend (Next.js and TypeScript):**
    ```bash
    cd frontend
    npm install
    ```

2. **Backend (Go and SQLite):**
    ```bash
    cd backend
    go get -d ./...
    ```

## Project Structure

The project consists of two main parts: the frontend and the backend.

- **frontend:** Next.js and TypeScript were used for the user interface.
- **backend:** Go and SQLite were used to manage and process user data.

## Running the Application

1. **Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
   Visit `http://localhost:3000` in your browser to see the application.

2. **Backend:**
    ```bash
    cd backend
    go run main.go
    ```
   The server will run at `http://localhost:8000`.

## Usage

When the application starts, visit `http://localhost:3000` in your browser to access the user management interface. You can add new users, view existing users, update their information and delete them. And you can exit the user selection by pressing the escape(esc) key or by clicking on a blank area of the page.
