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

  handleSubmit() {
    this.props.onFormSubmit();
    alert('Winning score set to: ' + this.props.formInput);
  }

  render() {
    const formInput = this.props.formInput;
    console.log(this.props.formInput);
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Final score"
          className="final-score"
          onChange={this.handleChange}
          value={formInput}
        />
      </form>
    );
  }
}

export default FinalScoreForm;
