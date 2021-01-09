import React from 'react';

const WrongMove = ({wrongMoveDisplay}) => {
  return (
    <div style={wrongMoveDisplay} id="wrong-move-icon">
      <i className="ion-ios-close-empty"></i>
    </div>
  );
};

export default WrongMove;
