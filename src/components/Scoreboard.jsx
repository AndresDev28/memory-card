import React from 'react';

function Scoreboard({ turns, bestScore }) {
  return (
    <div className='scoreboard'>
      <p>Turns: {turns}</p>
      <p>Best score: {bestScore}</p>
    </div>
  );
}

export default Scoreboard;
