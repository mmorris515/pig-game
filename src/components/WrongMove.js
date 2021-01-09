import React from 'react';

const WrongMove = ({wrongMoveDisplay}) => {
  return (
    <div id="wrong-move-icon" style={wrongMoveDisplay}>
      <i className="ion-ios-close-empty"></i>
    </div>
  );
};

export default WrongMove;
