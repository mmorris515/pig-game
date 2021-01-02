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
    player0PanelCss: 'player-0-panel',
    player1PanelCss: 'player-1-panel',
  };

  componentDidMount() {
    // this.init();
  }

  init() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 10,
      winningScore: 100,
      moveMade: false,
      gamePlaying: true,
      diceDisplay: {display: 'none'},
    });
    console.log('New game started');
  }

  hold() {
    console.log('Hold');
  }

  nextPlayer() {
    this.state.activePlayer === 0
      ? this.setState({activePlayer: 1})
      : this.setState({activePlayer: 0});
    this.setState({roundScore: 0});
    console.log('Next Player');
  }

  diceRoll() {
    console.log('Dice rolled');
    // 1. Random number
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      let currentRoundScore = this.state.roundScore;
      currentRoundScore += dice;
      this.setState({roundScore: currentRoundScore});
    } else {
      this.nextPlayer();
    }
  }

  // Final rendered app
  render() {
    return (
      <div>
        <Original
          scores={this.state.scores}
          handleHold={this.hold}
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
