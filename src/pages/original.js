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
import WrongMove from '../components/WrongMove.js';
import StatusText from '../components/StatusText.js';
import dice1 from '../images/dice1.png';
import dice2 from '../images/dice2.png';
import dice3 from '../images/dice3.png';
import dice4 from '../images/dice4.png';
import dice5 from '../images/dice5.png';
import dice6 from '../images/dice6.png';

class Original extends React.Component {
  render() {
    const images = [dice1, dice2, dice3, dice4, dice5, dice6];
    return (
      <div className="wrapper clearfix">
        <div
          className={
            this.props.activePlayer === 0
              ? 'player-0-panel active'
              : 'player-0-panel'
          }
        >
          <div className="player-name" id="name-0">
            {this.props.winner === 0 ? 'Winner!' : 'Player 1'}
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

        <div
          className={
            this.props.activePlayer === 1
              ? 'player-1-panel active'
              : 'player-1-panel'
          }
        >
          <div className="player-name" id="name-1">
            {this.props.winner === 1 ? 'Winner!' : 'Player 2'}
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

        <button className="btn-new" onClick={this.props.newGame}>
          <i className="ion-ios-plus-outline"></i>New game
        </button>
        <button className="btn-roll" onClick={this.props.diceRoll}>
          <i className="ion-ios-loop"></i>Roll dice
        </button>
        <button className="btn-hold" onClick={this.props.hold}>
          <i className="ion-ios-download-outline"></i>Hold
        </button>

        <input type="text" placeholder="Final score" className="final-score" />

        <Dice
          diceId="dice-1"
          diceDisplay={this.props.diceDisplay}
          src={images[this.props.topDice - 1]}
        />
        <Dice
          diceId="dice-2"
          diceDisplay={this.props.diceDisplay}
          src={images[this.props.bottomDice - 1]}
        />

        <WrongMove wrongMoveDisplay={this.props.wrongMoveDisplay} />

        <StatusText
          style={this.props.statusTextDisplay}
          statusText={this.props.statusText}
        />
      </div>
    );
  }
}

export default Original;
