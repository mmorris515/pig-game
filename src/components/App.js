import React from 'react';
import Game from '../pages/game.js';
import '../styles/style.css';

// Used to control game status text display
let rollCount = 0;

// Used to convert player name from number to capitalized word in diceRoll function
var converter = require('number-to-words');
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

class App extends React.Component {
  state = {
    scores: [0, 0],
    activePlayer: null,
    roundScore: 0,
    gamePlaying: false,
    diceDisplay: {display: 'none'},
    topDice: null,
    bottomDice: null,
    wrongMoveDisplay: {display: 'none'},
    statusText: null,
    winningScore: 50,
    winner: null,
    gameStatusText: 'First to 50 points wins the game!',
    gameStatusTextDisplay: {display: 'block'},
    rollCount: 0,
    formVisibility: {visibility: 'visible'},
    formInput: '',
    formDisabled: '',
    holdDisabled: 'disabled',
    scoreToWin: 50,
  };

  updateGameStatus() {
    // update game status text with points to win game
    let newScoreToWin = this.state.winningScore;
    let newGameStatusText =
      'First to ' + newScoreToWin + ' points wins the game!';
    this.setState({
      gameStatusText: newGameStatusText,
    });
  }

  reset() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      winner: null,
    });
  }

  init() {
    this.updateGameStatus();
    this.reset();
    this.setState({
      diceDisplay: {display: 'block'},
      gamePlaying: true,
      formDisabled: 'disabled',
      holdDisabled: '',
    });
  }

  newGame() {
    this.updateGameStatus();
    this.reset();
    this.setState({
      gamePlaying: false,
      winner: null,
      diceDisplay: {display: 'none'},
      wrongMoveDisplay: {display: 'none'},
      statusText: null,
      formDisabled: '',
      holdDisabled: 'disabled',
    });
  }

  endGame() {
    console.log('Winner!');
    this.setState({
      gamePlaying: false,
      activePlayer: null,
      roundScore: 0,
      winner: this.state.activePlayer,
      formVisibility: {visibility: 'visible'},
      formDisabled: '',
      holdDisabled: 'disabled',
    });
  }

  onFormChange(event) {
    this.setState({formInput: event, formValue: event});
  }

  onFormSubmit() {
    let newScoreToWin = this.state.formInput;
    if (this.state.formInput === '') {
      newScoreToWin = 50;
    }
    if (isNaN(this.state.formInput)) {
      alert(
        `${this.state.formInput} is not a number. Please enter a number and try again`
      );
    } else {
      let newGameStatusText =
        'First to ' + newScoreToWin + ' points wins the game!';
      this.reset();
      this.setState({
        winningScore: newScoreToWin,
        gameStatusText: newGameStatusText,
        gamePlaying: true,
      });
    }
  }

  hold() {
    const currentRoundScore = this.state.roundScore;
    const newPlayerScore =
      this.state.scores[this.state.activePlayer] + currentRoundScore;
    const newScores = this.state.scores;
    newScores[this.state.activePlayer] = newPlayerScore;
    this.setState({
      scores: newScores,
      statusText: null,
      wrongMoveDisplay: {display: 'none'},
      diceDisplay: {display: 'none'},
    });
    if (newPlayerScore < this.state.winningScore) {
      this.setState({roundScore: 0});
      this.nextPlayer();
    } else {
      this.endGame();
      let gameWinner = this.state.activePlayer + 1;
      this.setState({gameStatusText: `Player ${gameWinner} wins!`});
    }
  }

  nextPlayer() {
    if (this.state.activePlayer === 0 || this.state.activePlayer === null) {
      this.setState({activePlayer: 1});
    }
    if (this.state.activePlayer === 1) {
      this.setState({activePlayer: 0});
    }
    this.setState({
      roundScore: 0,
      gameStatusText: null,
    });
    console.log('Next Player');
  }

  diceRoll() {
    console.log('Roll');

    this.setState({
      diceDisplay: {display: 'block'},
      formVisibility: {visibility: 'hidden'},
      formDisabled: 'disabled',
      holdDisabled: '',
      gameStatusText: null,
      wrongMoveDisplay: {display: 'none'},
      rollCount: rollCount,
    });

    if (this.state.gamePlaying === false) {
      this.init();
      this.setState({gameStatusText: null});
    }

    if (this.state.rollCount > 0) {
      this.setState({gameStatusText: null});
    }

    rollCount = rollCount + 1;

    // Random number
    const topDice = Math.floor(Math.random() * 6) + 1;
    this.setState({topDice: topDice});

    const bottomDice = Math.floor(Math.random() * 6) + 1;
    this.setState({bottomDice: bottomDice});

    // for status text of player name
    const activePlayerVar = capitalize(
      converter.toWords(Number(this.state.activePlayer) + 1)
    );

    // Update the round score if player holds and neither dice is a 1
    if (topDice !== 1 && bottomDice !== 1) {
      let currentRoundScore = this.state.roundScore;
      let roll = topDice + bottomDice;
      currentRoundScore += roll;
      const statusTextVar = `Player ${activePlayerVar} rolled ${roll}.`;
      this.setState({
        roundScore: currentRoundScore,
        statusText: statusTextVar,
      });
    }

    // Update the round score if player rolls a single 1
    if (
      (topDice === 1 && bottomDice !== 1) ||
      (bottomDice === 1 && topDice !== 1)
    ) {
      let statusTextVar = null;
      if (this.state.roundScore === 0) {
        statusTextVar = `Player ${activePlayerVar} rolled a 1. Next player.`;
      } else {
        statusTextVar = `Player ${activePlayerVar} rolled a 1. Round score erased.`;
      }
      this.setState({
        wrongMoveDisplay: {display: 'block'},
        statusText: statusTextVar,
      });
      this.nextPlayer();
    }

    // Update the round score if player rolls snake eyes
    if (topDice === 1 && bottomDice === 1) {
      this.setState({roundScore: 0});
      const newPlayerScore = 0;
      const newScores = this.state.scores;
      newScores[this.state.activePlayer] = newPlayerScore;
      const statusTextVar = `Snake eyes! Player ${activePlayerVar} score erased`;
      this.setState({
        scores: newScores,
        wrongMoveDisplay: {display: 'block'},
        statusText: statusTextVar,
      });
      this.nextPlayer();
    }
  }

  // Final rendered app
  render() {
    return (
      <div>
        <Game
          scores={this.state.scores}
          hold={this.hold.bind(this)}
          diceDisplay={this.state.diceDisplay}
          roundScore={this.state.roundScore}
          activePlayer={this.state.activePlayer}
          init={this.init.bind(this)}
          nextPlayer={this.nextPlayer.bind(this)}
          diceRoll={this.diceRoll.bind(this)}
          winner={this.state.winner}
          topDice={this.state.topDice}
          bottomDice={this.state.bottomDice}
          statusText={this.state.statusText}
          wrongMoveDisplay={this.state.wrongMoveDisplay}
          newGame={this.newGame.bind(this)}
          gameStatusText={this.state.gameStatusText}
          gameStatusTextDisplay={this.state.gameStatusTextDisplay}
          formVisibility={this.state.formVisibility}
          onFormChange={this.onFormChange.bind(this)}
          onFormSubmit={this.onFormSubmit.bind(this)}
          formInput={this.state.formInput}
          formDisabled={this.state.formDisabled}
          holdDisabled={this.state.holdDisabled}
          winningScore={this.state.winningScore}
        />
      </div>
    );
  }
}

export default App;
