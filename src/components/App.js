import React from 'react';
import Original from '../pages/original.js';
import '../styles/style-original.css';

class App extends React.Component {
  state = {
    scores: [0, 0],
    activePlayer: null,
    roundScore: 0,
    gamePlaying: false,
    diceDisplay: {display: 'none'},
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
    });
    console.log('New game started');
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
    const currentScore = this.state.roundScore;
    const newScore = this.state.scores[this.state.activePlayer] + currentScore;
    const newScores = this.state.scores.slice();
    newScores[this.state.activePlayer] = newScore;
    this.setState({scores: newScores});
    if (newScore < this.state.winningScore) {
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

    // Update the round score IF the rolled number was NOT a 1
    if (topDice !== 1) {
      let currentRoundScore = this.state.roundScore;
      currentRoundScore += topDice;
      this.setState({roundScore: currentRoundScore});
      console.log(`Player ${activePlayerVar} rolled a ${topDice}`);
    }

    if (topDice === 1) {
      console.log(`Player ${activePlayerVar} rolled a ${topDice}`);
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
        />
      </div>
    );
  }
}

export default App;
