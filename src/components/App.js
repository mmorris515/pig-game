import React from 'react';
import Original from '../pages/original.js';
import '../styles/style-original.css';

class App extends React.Component {
  state = {
    scores: [0, 0],
    activePlayer: 0,
    roundScore: 0,
    gamePlaying: false,
    moveMade: false,
    diceDisplay: {display: 'none'},
    player0PanelCss: 'player-0-panel',
    player1PanelCss: 'player-1-panel',
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.setState({
      scores: [0, 0],
      activePlayer: 0,
      roundScore: 0,
      winningScore: 100,
      moveMade: false,
      gamePlaying: true,
      diceDisplay: {display: 'none'},
      player0PanelCss: 'player-0-panel active',
    });
  }

  /* Already included in init()
    document.querySelector('.dice').style.display = 'none';

    TO INCLUDE IN: init()
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    ***Need to define the logic here
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    */

  diceRoll() {
    console.log('Dice Rolled');
  }

  hold() {
    console.log('Hold');
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
        />
      </div>
    );
  }
}

export default App;
