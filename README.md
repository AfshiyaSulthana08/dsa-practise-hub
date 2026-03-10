# DSA Practice Hub 🚀

A modern, local-first web application to track your Data Structures and Algorithms practice, view curated topic-wise problems, maintain daily streaks, and visualize your progress with a GitHub-style heatmap. 

Built entirely with **HTML, CSS, and vanilla JavaScript** (No frameworks required). Data is securely persisted in your browser's Local Storage.

## ✨ Features

- **Dashboard**: Track your total solved problems, daily progress, and longest streaks.
- **Curated Topics**: Organized list of DSA topics (Arrays, Strings, Trees, etc.) packed with high-quality problems from LeetCode. Mark them as solved!
- **Daily Tracker**: Add, edit, delete, and mark off custom practice tasks.
- **Activity Heatmap**: Visualize your last 365 days of practice in a beautiful GitHub-style grid.
- **Gamification Badges**: Earn badges like "On Fire" (7 Day Streak), "Half Century" (50 Solved), and "Topic Master" automatically based on your stats.
- **Dark/Light Mode**: Smooth transitions between themes built meticulously with CSS variables. 

## 📁 File Structure

- `index.html` — The main layout and UI skeleton.
- `style.css` — Modern, responsive styles, animations, and custom colors.
- `data.js` — The curated set of topics and default initial state variables.
- `script.js` — The core application logic, routing, UI rendering, and Local Storage management.

## 🚀 How to Run

Because this project is built entirely with Frontend web technologies, running it is incredibly simple:

1. Clone or download this repository.
2. Open the directory containing the files.
3. Simply double-click on `index.html` to open it in your default web browser (e.g., Chrome, Edge, Firefox, Safari).
   - Alternatively, use a tool like the **Live Server** extension in VS Code to run it on a local development server for automatic reloading.

No Node.js, npm, or database setup is required! All state is saved inside your browser using Window.localStorage.

## 🌈 Design Notes

- Developed a Card-Based UI that focuses on data visibility.
- Utilized CSS Flexbox and Grid extensively for layout flow and responsiveness on mobile.
- Custom heatmap logic translates `localStorage` history directly into colored grid units based on activity density.

Happy Coding! 💻🔥
