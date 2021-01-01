import React from 'react';
import dice from '../images/dice-5.png';

const Dice = ({diceDisplay, diceId}) => {
  return (
    <img
      className="dice"
      src={dice}
      alt="dice"
      id={diceId}
      style={diceDisplay}
    ></img>
  );
};

export default Dice;
