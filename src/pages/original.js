// 1. Displays original functionality of the vanilla JS web app as created by Jonas Schmedtmann (same UI, but translated to React) - for comparison against the new functionalities I built in.

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as they wish. Each result gets added to their ROUND score
- BUT, if the player rolls a 1, their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game (or selected final score)

*/

import React from 'react';
import Dice from '../components/Dice.js';

class Original extends React.Component {
  render() {
    return (
      <div className="wrapper clearfix">
        <div className={this.props.player0PanelCss}>
          <div className="player-name" id="name-0">
            Player 1
          </div>
          <div className="player-score" id="score-0">
            {this.props.scores[0]}
          </div>
          <div className="player-current-box">
            <div className="player-current-label">Current</div>
            <div className="player-current-score" id="current-0">
              {this.props.activePlayer === 0 ? this.props.roundScore : 0}
            </div>
          </div>
        </div>

        <div className={this.props.player1PanelCss}>
          <div className="player-name" id="name-1">
            Player 2
          </div>
          <div className="player-score" id="score-1">
            {this.props.scores[1]}
          </div>
          <div className="player-current-box">
            <div className="player-current-label">Current</div>
            <div className="player-current-score" id="current-1">
              {this.props.activePlayer === 1 ? this.props.roundScore : 0}
            </div>
          </div>
        </div>

        <button className="btn-new">
          <i className="ion-ios-plus-outline"></i>New game
        </button>
        <button className="btn-roll" onClick={this.props.handleDiceRoll}>
          <i className="ion-ios-loop"></i>Roll dice
        </button>
        <button className="btn-hold" onClick={this.props.handleHold}>
          <i className="ion-ios-download-outline"></i>Hold
        </button>

        <input type="text" placeholder="Final score" className="final-score" />

        {/*
        <img src={dice} alt="Dice" className="dice" id="dice-1" />
        <img src={dice} alt="Dice" className="dice" id="dice-2" />
        */}
        <Dice diceId="dice-1" diceDisplay={this.props.diceDisplay} />
      </div>
    );
  }
}

export default Original;
