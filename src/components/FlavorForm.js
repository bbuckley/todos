import React from 'react'
class FlavorForm extends React.Component {
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
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Status:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value=""></option>
            <option value="A">A</option>
            <option value="T">T</option>
            <option value="L">L</option>
            <option value="D">D</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FlavorForm
