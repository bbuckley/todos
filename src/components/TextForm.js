import React from 'react'

import { store } from '../index'

import { setFilterText } from '../actions/index'



class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.text }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    //alert('Your favorite text is: ' + this.state.value)
    //const x = this.props.xxx(event)
    //state.dispatch({ type: 'SET_FILTER', filter: { text: this.state.value }})
    store.dispatch(setFilterText(this.state.value))

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.value} onChange={this.handleChange}/>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}

export default TextForm
