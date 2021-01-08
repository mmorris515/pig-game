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

// Need function to convert topDice variable to topDiceImg for import function below

export default Dice;
