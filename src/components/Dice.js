import React from 'react';

const Dice = ({diceDisplay, diceId, src}) => {
  return (
    <img
      className="dice"
      alt="dice"
      id={diceId}
      style={diceDisplay}
      src={src}
    ></img>
  );
};

export default Dice;
