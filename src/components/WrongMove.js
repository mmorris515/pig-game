import React from 'react';

const WrongMove = ({wrongMoveDisplay, wrongMoveText}) => {
  return (
    <div style={wrongMoveDisplay}>
      <div id="wrong-move-icon">
        <i className="ion-ios-close-empty"></i>
      </div>
      <div id="wrong-move-text">{wrongMoveText}</div>
    </div>
  );
};

export default WrongMove;
