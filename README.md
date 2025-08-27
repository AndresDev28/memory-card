# Dragon Ball Z - Memory Card Game

A Dragon Ball Z-themed memory card game built with React. This project demonstrates modern React concepts, including components, hooks, state management, and advanced CSS animations.

## 🎯 Project Overview

This memory game challenges players to find all matching pairs of Dragon Ball Z characters on a game board. The game utilizes the [Dragon Ball API](https://dragonball-api.com/) to dynamically fetch characters and offers different difficulty levels for an engaging and replayable experience.

## ✨ Features

-   **Variable Difficulty**: Choose between Easy, Medium, and Hard modes to change the number of cards in play.
-   **3D Animations**: Cards feature a smooth 3D flip animation.
-   **Visual Effects**: A hover effect enlarges cards to improve interactivity, and a custom background provides a unique aesthetic.
-   **Score Tracking**: The game counts turns and saves the best score to the browser's local storage.
-   **Responsive Design**: Works seamlessly on desktop and mobile devices, adjusting the game board to the screen size.
-   **Complete Game Logic**: Automatic pair detection, game reset functionality, and a dynamic win condition.

## 🛠️ Technologies Used

-   **React 18**: The core library for building the user interface.
-   **Hooks**: `useState` and `useEffect` for functional state management and lifecycle events.
-   **Vite**: A blazing-fast build tool and development server.
-   **Modern CSS**:
    -   Flexbox & Grid for complex, responsive layouts.
    -   Animations with `transform` and `transition`.
    -   CSS Custom Properties for dynamic styling from React.
    -   Pseudo-elements for background effects.
-   **JavaScript (ES6+)**: Modern JavaScript syntax and features.
-   **Git & GitHub**: For version control.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd memory-card
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## 🎮 How to Play

1.  **Choose a difficulty**: Select "Easy", "Medium", or "Hard".
2.  **Click a card** to reveal it.
3.  **Click a second card** to try and find a match.
4.  If the cards match, they will remain face up.
5.  If they don't match, they will flip back down after a short delay.
6.  The game ends when all pairs are found. Try to beat your best score!

## 📚 Learning Objectives

This project was a practical exercise to deepen understanding of:

-   **Components & Props**: Creating modular and reusable components (`Card`, `CardsGrid`, `Scoreboard`).
-   **Advanced State Management**: Using multiple `useState` hooks to manage game logic, user selections, and the UI.
-   **Side Effects with `useEffect`**: Fetching data from an external API and reacting to state changes to trigger game logic.
-   **Conditional Rendering**: Displaying different UI elements based on the game's state.
-   **Advanced CSS Styling**:
    -   Implementing 3D animations (`transform`, `perspective`, `backface-visibility`).
    -   Creating complex, responsive layouts with Grid and Flexbox.
    -   Using CSS Custom Properties to bridge React state with styling (e.g., number of grid columns).
-   **Event Handling**: Efficiently responding to user interactions.
-   **Local Storage**: Persisting data (the best score) in the browser.

## 🏗️ Project Structure

```
src/
├── App.jsx             # Main component, contains all game logic
├── App.css             # Main application styles
├── main.jsx            # Application entry point
├── index.css           # Global styles
│
├── assets/
│   └── images/         # Local images for the background and cards
│
└── components/
    ├── Card.jsx        # Component for a single card
    ├── Card.css        # Styles specific to the card
    ├── CardsGrid.jsx   # Component that renders the game board
    └── Scoreboard.jsx  # Component to display turns and score
```

## 🙏 Acknowledgments

-   Built as part of The Odin Project curriculum.
-   Character data from the [Dragon Ball API](https://dragonball-api.com/).

---

**Happy coding! 🎉**

---