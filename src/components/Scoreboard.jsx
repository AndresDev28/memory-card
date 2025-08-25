import React from 'react';

function Scoreboard({ turns }) {
  return (
    <div className='scoreboard'>
      <p>Turns: {turns}</p>
      {/* Aquí ira el Best Score */}
    </div>
  );
}

export default Scoreboard;
