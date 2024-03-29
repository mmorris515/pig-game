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
import FinalScoreForm from '../components/FinalScoreForm.js';
import dice1 from '../images/dice1.png';
import dice2 from '../images/dice2.png';
import dice3 from '../images/dice3.png';
import dice4 from '../images/dice4.png';
import dice5 from '../images/dice5.png';
import dice6 from '../images/dice6.png';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

class Game extends React.Component {
  render(props) {
    const images = [dice1, dice2, dice3, dice4, dice5, dice6];

    const holdDisabledState = this.props.holdDisabled;
    let hicValue = null;
    let holdTextStyle = null;
    const holdIconColorCalc = (holdDisabledState) => {
      if (holdDisabledState === 'disabled') {
        hicValue = 'greyout';
        holdTextStyle = '';
      } else {
        hicValue = 'hold-hover hold-icon-active';
        holdTextStyle = 'hold-text-hover';
      }
    };
    holdIconColorCalc(holdDisabledState);

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
          <ControlPointIcon className="new-game-icon"></ControlPointIcon>New game
        </button>

        <button className="btn-roll" onClick={this.props.diceRoll}>
          <CachedIcon className="roll-dice-icon"></CachedIcon>
          <span className="roll-dice-text">Roll dice</span>
        </button>

        <button
          className="btn-hold"
          onClick={this.props.hold}
          disabled={this.props.holdDisabled}
        >
          <SystemUpdateAltOutlinedIcon
            className={`hold-icon ${hicValue}`}
          ></SystemUpdateAltOutlinedIcon>
          <span className={`hold-text ${holdTextStyle}`}>HOLD</span>
        </button>

        <FinalScoreForm
          formVisibility={this.props.formVisibility}
          formDisabled={this.props.formDisabled}
          init={this.props.init}
          onFormChange={this.props.onFormChange}
          onFormSubmit={this.props.onFormSubmit}
          formInput={this.props.formInput}
          winningScore={this.props.winningScore}
        />

        <a
          className="game-rules"
          href="https://en.wikipedia.org/wiki/Pig_(dice_game)#Two-Dice_Pig"
        >
          Game rules
        </a>

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
          style={this.props.gameStatusTextDisplay}
          statusText={this.props.gameStatusText}
          className="status-text"
          id="game-status-text"
        />

        <StatusText
          statusText={this.props.statusText}
          className="status-text"
        />
      </div>
    );
  }
}

export default Game;
