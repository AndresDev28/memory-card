import './App.css';
import { useState, useEffect } from 'react';
import CardsGrid from './components/CardsGrid';
import Scoreboard from './components/Scoreboard';

function App() {
  const [cards, setCards] = useState([]);
  // Estado para la selección de cartas del jugador
  const [selection, setSelection] = useState([]); // Este array guardará las cartas completas que el usuario haya volteado en su turno (0, 1 o 2 cartas).

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=8')
      .then(res => res.json())
      .then(data => {
        // duplicamos las cartas de personajes para formar la parejas
        const gameCards = [...data.items, ...data.items];
        console.log('Cantidad de cartas:', gameCards.length);

        const processedCards = gameCards.map((card, index) => ({
          // Copia todas las propiedades del personaje
          ...card,
          // Agrega una nueva propiedad 'uniqueId'
          uniqueId: index,
        }));
        // Desordenamos el nuevo mazo de cartas
        const shuffledCards = [...processedCards].sort(
          () => Math.random() - 0.5
        );
        setCards(shuffledCards);
        console.log(shuffledCards);
      })

      .catch(err => console.log('Error fetching characters', err));
  }, []); // Se ejecuta solo una vez

  function handleCardClick(clickedCard) {
    setSelection([...selection, clickedCard]);
    console.log('Card clicked:', characterId, characterName);
  }

  return (
    <div className='App'>
      <header>
        <h1>Memory Card Z</h1>
        <Scoreboard />
      </header>
      <CardsGrid
        cards={cards}
        onCardClick={handleCardClick}
        selection={selection} // Así el componente Card sabe si la carta está boca arriba o boca abajo en el array 'selection'
      />
    </div>
  );
}

export default App;
