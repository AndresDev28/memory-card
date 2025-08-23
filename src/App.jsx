import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    fetch("https://dragonball-api.com/api/characters?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data.items); // Guardamos a los Guerreros
        console.log("Character data:", data);
      })

      .catch((err) => console.log("Error fetching character", err));
  }, []); // Se ejecuta solo una vez

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <div className="game-container">
        {/* Memory card game will go here */}
        <p>Memory Card Game coming soon!</p>
        <h3>Lista de Guerreros</h3>
        <ul>
          {character.map((character) => (
            <li key={character.id}>
              {character.name} {character.ki}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
