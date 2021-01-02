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
      player0PanelCss: 'player-0-panel active',
    });
    console.log('New game started');
  }

  diceRoll() {
    console.log('Dice Rolled');
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

  // Final rendered app
  render() {
    return (
      <div>
        <Original
          scores={this.state.scores}
          handleDiceRoll={this.diceRoll}
          handleHold={this.hold}
          diceDisplay={this.state.diceDisplay}
          player0PanelCss={this.state.player0PanelCss}
          player1PanelCss={this.state.player1PanelCss}
          roundScore={this.state.roundScore}
          activePlayer={this.state.activePlayer}
          init={this.init.bind(this)}
          nextPlayer={this.nextPlayer.bind(this)}
        />
      </div>
    );
  }
}

export default App;
