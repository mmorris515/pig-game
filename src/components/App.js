import React from 'react';
import Original from '../pages/original.js';
import '../styles/style-original.css';

class App extends React.Component {
  state = {
    scores: [0, 0],
    activePlayer: null,
    roundScore: 0,
    gamePlaying: false,
    moveMade: false,
    diceDisplay: {display: 'none'},
  };

  init() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      winningScore: 100,
      moveMade: false,
      gamePlaying: true,
      diceDisplay: {display: 'none'},
    });
    console.log('New game started');
  }

  hold() {
    const currentScore = this.state.roundScore;
    const newScore = this.state.scores[this.state.activePlayer] + currentScore;
    const newScores = this.state.scores.slice();
    newScores[this.state.activePlayer] = newScore;
    this.setState({scores: newScores});
    this.nextPlayer();
  }

  nextPlayer() {
    this.state.activePlayer === 0
      ? this.setState({activePlayer: 1})
      : this.setState({activePlayer: 0});
    this.setState({roundScore: 0});
    console.log('Next Player');
  }

  diceRoll() {
    if (this.state.gamePlaying === false) {
      this.init();
    }

    // for Console log
    const activePlayerVar = Number(this.state.activePlayer) + 1;

    // 1. Random number
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      let currentRoundScore = this.state.roundScore;
      currentRoundScore += dice;
      this.setState({roundScore: currentRoundScore});
      console.log(`Player ${activePlayerVar} rolled a ${dice}`);
    } else {
      console.log(
        `Player ${activePlayerVar} rolled a ${dice}. Next player's turn.`
      );
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
        />
      </div>
    );
  }
}

export default App;
