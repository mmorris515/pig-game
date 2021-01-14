import React from 'react';
import '../styles/style.css';

class FinalScoreForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onFormChange(event.target.value);
  }

  handleSubmit(event) {
    this.props.onFormSubmit();
    event.preventDefault();
    const newWinningScore = this.props.formInput;
    console.log(`Score to win: ${newWinningScore}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Final score"
          className="final-score"
          onChange={this.handleChange}
          disabled={this.props.formDisabled}
        />
      </form>
    );
  }
}

export default FinalScoreForm;
