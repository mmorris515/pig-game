import React from 'react';
import Original from '../pages/original.js';
import '../styles/style.css';

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
  };

  init() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      gamePlaying: true,
      diceDisplay: {display: 'block'},
      winner: null,
      topDice: null,
      bottomDice: null,
      statusTextDisplay: {display: 'block'},
      statusText: 'New game',
    });
  }

  endGame() {
    console.log('Winner!');
    this.setState({
      gamePlaying: false,
      activePlayer: null,
      winner: this.state.activePlayer,
      roundScore: 0,
    });
  }

  hold() {
    const currentRoundScore = this.state.roundScore;
    const newPlayerScore =
      this.state.scores[this.state.activePlayer] + currentRoundScore;
    const newScores = this.state.scores;
    newScores[this.state.activePlayer] = newPlayerScore;
    this.setState({scores: newScores});
    if (newPlayerScore < this.state.winningScore) {
      this.setState({roundScore: 0});
      this.nextPlayer();
    } else {
      this.endGame();
    }
  }

  nextPlayer() {
    if (this.state.activePlayer === 0 || this.state.activePlayer === null) {
      this.setState({activePlayer: 1});
    }
    if (this.state.activePlayer === 1) {
      this.setState({activePlayer: 0});
    }
    this.setState({roundScore: 0});
    console.log('Next Player');
  }

  diceRoll() {
    console.log('Roll');

    if (this.state.gamePlaying === false) {
      this.init();
    }

    // Random number
    const topDice = Math.floor(Math.random() * 6) + 1;
    this.setState({topDice: topDice});

    const bottomDice = Math.floor(Math.random() * 6) + 1;
    this.setState({bottomDice: bottomDice});

    // for Console log of player roll
    const activePlayerVar = Number(this.state.activePlayer) + 1;

    // Update the round score if player holds and neither dice is a 1
    if (topDice !== 1 && bottomDice !== 1) {
      let currentRoundScore = this.state.roundScore;
      let totalRoundScore = topDice + bottomDice;
      currentRoundScore += totalRoundScore;
      const statusTextVar = `Player ${activePlayerVar} rolled a ${topDice} and a ${bottomDice}`;
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
      const statusTextVar = `Player ${activePlayerVar} rolled a ${topDice} and a ${bottomDice}`;
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
      const statusTextVar = `Snake eyes! Player ${activePlayerVar} loses their score`;
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
        />
      </div>
    );
  }
}

export default App;
