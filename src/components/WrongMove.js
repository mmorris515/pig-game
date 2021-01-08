import React from 'react';

const WrongMove = ({wrongMoveText}) => {
  return (
    <div>
      <div id="wrong-move-icon">
        <i className="ion-ios-close-empty"></i>
      </div>
      <div id="wrong-move-text">{wrongMoveText}</div>
    </div>
  );
};

export default WrongMove;
