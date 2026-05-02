# CryptoTracker | Crypto Portfolio Manager
<img width="1881" height="892" alt="image" src="https://github.com/user-attachments/assets/557b5382-723b-450d-8907-192d109cb539" />




## Overview
NexusTracker is a minimalist, high-performance cryptocurrency portfolio tracker designed for real-time asset monitoring. Built as a capstone project for the Computer Science & Engineering program, the application demonstrates efficient state management and dynamic routing within a React environment.

## Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Data Fetching:** Native Fetch API

## Core Features
- **Live Market Feed:** Real-time data integration with public crypto APIs.
- **Dynamic Routing:** Seamless navigation between Market, Portfolio, and Management views.
- **State Management:** Implementation of React Context API for global portfolio state without the overhead of external libraries.
- **Minimalist UI:** High-contrast, design-focused interface optimizing readability and user focus.

## Project Structure
- `src/components/`: Modular, reusable components (Dashboard, Market, PortfolioForm).
- `src/App.jsx`: Root application wrapper managing global context and routing.
- `src/index.css`: Global styles and custom Tailwind configuration.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to download dependencies.
3. Run `npm run dev` to start the development server.

## Academic Context
This project adheres to strict functional component architecture using React Hooks (`useState`, `useEffect`, `useContext`) and avoids external state management libraries to maintain a lightweight, syllabus-compliant codebase.
