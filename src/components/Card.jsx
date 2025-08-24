import React from 'react';

function Card({ character, onCardClick, isFlipped }) {
  const handleClick = () => {
    onCardClick(character);
  };

  return (
    <div className='card' onClick={handleClick}>
      {isFlipped ? (
        // Si está volteada muestra la imagen y el nombre
        <>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
        </>
      ) : (
        // Si no, muestra el reverso de la carta
        <div className='card-back'>?</div>
      )}
    </div>
  );
}

export default Card;
