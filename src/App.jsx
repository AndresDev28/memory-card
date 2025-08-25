import './App.css';
import { useState, useEffect } from 'react';
import CardsGrid from './components/CardsGrid';
import Scoreboard from './components/Scoreboard';

function App() {
  const [cards, setCards] = useState([]);
  // Estado para la selección de cartas del jugador
  const [selection, setSelection] = useState([]); // Este array guardará las cartas completas que el usuario haya volteado en su turno (0, 1 o 2 cartas).
  // Estado para las parejas encontradas y se queden volteadas
  const [matched, setMatched] = useState([]);
  // Estado para la gestión de turnos
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=12')
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
    // Permitir seleccionar dos cartas por turno
    if (selection.length < 2) {
      setSelection([...selection, clickedCard]);
    }
  }

  // Creamos un hook de useEffect que se ejecute cada vez que el estado de 'selection' cambie.
  useEffect(() => {
    // Solo hacemos algo si se han seleccionado dos cartas
    if (selection.length === 2) {
      const [firstCard, secondCard] = selection;

      // Comprobamos si son parejas usando el id original del personaje
      if (firstCard.id === secondCard.id) {
        // Es pareja
        setMatched([...matched, firstCard.id]);
      }

      // Agregamos la lógica de incremento de turnos
      setTurns(prevTurns => prevTurns + 1);
      console.log('Número de turnos:', { turns });

      // Reseteamos la seleccion haya o no pareja con un setTimeout para que el jugador pueda ver su elección
      setTimeout(() => {
        setSelection([]);
      }, 1000);
    }
  }, [selection]); // Array de dependencia para que se ejecute

  // useEffect para determinar la victoria del jugador
  useEffect(() => {
    // Si el número de parejas es igual al máximo de las mismas (8) el jugador ha ganado
    if (matched.length === 8) {
      alert(`Has ganado! Lo conseguiste en ${turns} turnos`);
    }
  }, [matched, turns]); // Depende de ambas para mostrar el mensaje correcto

  return (
    <div className='App'>
      <h1>Memory Card Z</h1>
      <main className='game-container'>
        <Scoreboard turns={turns} />
        <CardsGrid
          cards={cards}
          onCardClick={handleCardClick}
          selection={selection} // Así el componente Card sabe si la carta está boca arriba o boca abajo en el array 'selection'
          matched={matched}
        />
      </main>
    </div>
  );
}

export default App;
