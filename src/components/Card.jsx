import React from 'react';
import './Card.css';
import dgbLogo from '../assets/images/dgb(1).png';

function Card({ character, onCardClick, isFlipped }) {
  const handleClick = () => {
    // Solo permite voltear la carta si esta no está volteada.
    if (!isFlipped) {
      onCardClick(character);
    }
  };

  return (
    <div className='card' onClick={handleClick}>
      <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className='card-front'>
          {/* Contenido del frente de la carta (imagen del personadje) */}
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
        </div>
        <div className='card-back'>
          {/* Contenido del dorso de la carta */}
          <img src={dgbLogo} alt='dragonball logo' />
        </div>
      </div>
    </div>
  );
}

export default Card;
