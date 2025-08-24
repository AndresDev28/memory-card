import React from 'react';
import Card from './Card';

export default function CardsGrid({ cards, onCardClick, selection }) {
  return (
    <div className='cards-grid'>
      {cards.map(card => {
        // Comprobamos si la carta actual está en la selección del usuario
        const isFlipped = selection.some(c => c.uniqueId === card.uniqueId); // .some() comprueba si al menos un elemento del array cumple la condición
        return (
          <Card
            key={card.uniqueId}
            character={card}
            onCardClick={onCardClick}
            isFlipped={isFlipped}
          />
        );
      })}
    </div>
  );
}
