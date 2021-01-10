import React from 'react';
import Original from '../pages/original.js';
import '../styles/style.css';
import FinalScoreForm from '../components/FinalScoreForm.js';

var converter = require('number-to-words');
let rollCount = 0;

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
    wrongMoveDisplay: {display: 'none'},
    statusTextDisplay: {display: 'none'},
    statusText: null,
    winningScore: 50,
    winner: null,
    topDice: null,
    bottomDice: null,
    gameStatusText: null,
    rollCount: 0,
  };

  init() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      gamePlaying: true,
      winner: null,
      topDice: null,
      bottomDice: null,
      diceDisplay: {display: 'block'},
      gameStatusText: 'First to 50 points wins the game',
    });
  }

  newGame() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      winner: null,
      topDice: null,
      bottomDice: null,
      gamePlaying: false,
      diceDisplay: {display: 'none'},
      wrongMoveDisplay: {display: 'none'},
      statusText: null,
      gameStatusText: 'First to 50 points wins the game',
    });
  }

  endGame() {
    console.log('Winner!');
    this.setState({
      gamePlaying: false,
      activePlayer: null,
      roundScore: 0,
      winner: this.state.activePlayer,
    });
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
      this.setState({statusText: `Player ${gameWinner} wins!`});
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

    this.setState({diceDisplay: {display: 'block'}});

    if (this.state.gamePlaying === false) {
      this.init();
    }

    if (this.state.rollCount > 0) {
      this.setState({gameStatusText: null});
    }

    rollCount = rollCount + 1;

    this.setState({
      wrongMoveDisplay: {display: 'none'},
      rollCount: rollCount,
    });

    // Random number
    const topDice = Math.floor(Math.random() * 6) + 1;
    this.setState({topDice: topDice});

    const bottomDice = Math.floor(Math.random() * 6) + 1;
    this.setState({bottomDice: bottomDice});

    // for Console log of player roll
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
        statusTextDisplay: {display: 'block'},
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
        statusTextDisplay: {display: 'block'},
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
        statusTextDisplay: {display: 'block'},
        statusText: statusTextVar,
      });
      this.nextPlayer();
    }
  }

  // Final rendered app
  render() {
    return (
      <div>
        <Original
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
          statusTextDisplay={this.state.statusTextDisplay}
          wrongMoveDisplay={this.state.wrongMoveDisplay}
          newGame={this.newGame.bind(this)}
          gameStatusText={this.state.gameStatusText}
        />
      </div>
    );
  }
}

export default App;
