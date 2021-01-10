import React from 'react';
import '../styles/style.css';

class FinalScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (isNaN(this.state.value)) {
      alert('Not a number. Please enter a number.');
    } else {
      alert('Final score set to ' + this.state.value);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Final score"
          className="final-score"
          value={this.state.value}
          onChange={this.handleChange}
          style={this.props.formVisibility}
        />
      </form>
    );
  }
}

export default FinalScoreForm;
