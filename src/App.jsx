import './App.css';
import { useState, useEffect } from 'react';
import CardsGrid from './components/CardsGrid';
import Scoreboard from './components/Scoreboard';

function App() {
  // <-- ESTADOS -->

  const [cards, setCards] = useState([]);
  // Estado para la selección de cartas del jugador
  const [selection, setSelection] = useState([]); // Este array guardará las cartas completas que el usuario haya volteado en su turno (0, 1 o 2 cartas).
  // Estado para las parejas encontradas y se queden volteadas
  const [matched, setMatched] = useState([]);
  // Estado para la gestión de turnos
  const [turns, setTurns] = useState(0);
  // Estado para el número de parejas
  const [numPairs, setNumPairs] = useState(0);
  // Estado para mejor puntuación
  const [bestScore, setBestScore] = useState(
    localStorage.getItem('bestScore') || 0
  );
  // Estado para guardar a los personajes
  const [characters, setCharacters] = useState([]);
  // Estado para elegir el número de cartas (Cantidad de parejas o selector de dificultad)
  const [pairCount, setPairCount] = useState(6);

  // <-- FIN DE ESTADOS -->

  // <-- FUNCIONES -->

  function resetGame() {
    resetTurnState();
    shuffleAndDeal(characters);
  }

  // Función para barajar las cartas
  function shuffleAndDeal(characterData) {
    setNumPairs(characterData.length);
    const gameCards = [...characterData, ...characterData];

    console.log('Cantidad de cartas:', gameCards.length);

    const processedCards = gameCards.map((card, index) => ({
      // Copia todas las propiedades del personaje
      ...card,
      // Agrega una nueva propiedad 'uniqueId'
      uniqueId: index,
    }));
    // Desordenamos el nuevo mazo de cartas
    const shuffledCards = [...processedCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }

  function handleCardClick(clickedCard) {
    // Permitir seleccionar dos cartas por turno
    if (selection.length < 2) {
      setSelection([...selection, clickedCard]);
    }
  }

  // Función para poner marcadores a 0 de la partida
  function resetTurnState() {
    setSelection([]);
    setMatched([]);
    setTurns(0);
  }

  // Funcion para elegir dificultad
  function handleDifficultyChange(newPairCount) {
    // 1. Reseteamos el progreso del juego inmediatamente.
    resetTurnState();
    // 2. Actualizamos el estado de dificultad para que se dispare el useEffect
    setPairCount(newPairCount);
  }

  // <-- FIN FUNCIONES -->

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters?limit=${pairCount}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.items); // Guardamos los personajes originales
        shuffleAndDeal(data.items); // Barajamos y repartimos por primera vez
      })

      .catch(err => console.log('Error fetching characters', err));
  }, [pairCount]); // Se ejecuta cada vez que cambia la variable pairCount

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
    // USAMOS el estado 'numPairs' para la condición de victoria
    // Comprobamos que numPairs > 0 para no ganar al inicio del juego con 0 parjas
    if (numPairs > 0 && matched.length === numPairs) {
      // Mejor puntuación de localStorage
      const storedBestScore = localStorage.getItem('bestScore');
      // Si no hay mejor puntuación o si los turns actuales son menores que bestScore, guarda la nueva puntuación
      if (!storedBestScore || turns < parseInt(storedBestScore)) {
        localStorage.setItem('bestScore', turns);
      }
      // Actualizamos el estado para que se refleje en pantalla
      setBestScore(turns);
      alert(`Has ganado! Lo conseguiste en ${turns} turnos`);
    }
  }, [matched, turns, numPairs]); // Depende de todas para mostrar el mensaje correcto

  let columns = 4; // valor por defecto
  switch (pairCount) {
    case 6:
      columns = 4; // Grid 4x3
      break;
    case 9:
      columns = 4; // Grid 4x4
      break;
    case 12:
      columns = 6; // Grid 6x4
      break;
    default:
      columns = 4;
  }

  return (
    <div className='App'>
      <h1>Memory Card Z</h1>
      <button onClick={resetGame} className='reset-game'>
        New Game
      </button>
      <div className='difficulty-selector'>
        <button
          className={pairCount === 6 ? 'active' : ''}
          onClick={() => handleDifficultyChange(6)}
        >
          Easy
        </button>
        <button
          className={pairCount === 9 ? 'active' : ''}
          onClick={() => handleDifficultyChange(9)}
        >
          Medium
        </button>
        <button
          className={pairCount === 12 ? 'active' : ''}
          onClick={() => handleDifficultyChange(12)}
        >
          Hard
        </button>
      </div>
      <main className='game-container'>
        <Scoreboard turns={turns} bestScore={bestScore} />
        <CardsGrid
          cards={cards}
          onCardClick={handleCardClick}
          selection={selection} // Así el componente Card sabe si la carta está boca arriba o boca abajo en el array 'selection'
          matched={matched}
          style={{ '--grid-cols': columns }}
        />
      </main>
    </div>
  );
}

export default App;
