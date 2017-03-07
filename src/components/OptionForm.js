import React from 'react'
class OptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.init.value};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(`value is - '${this.state.value}'`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            {this.props.init.options.map((i) => {
              return (
                <option key={i} value={i}>{i}</option>
              )
            })}
          </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default OptionForm
