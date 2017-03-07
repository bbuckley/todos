
import React from 'react'
import { connect } from 'react-redux'
import { store } from '../index'

class Tags extends React.Component {
  render(){
    const skip = t => !(typeof(t.tags)==='undefined' || t.tags === null || t.tags.trim() === '')
    const a = [...this.props.todos
      .filter(skip)
      .map(x => x.tags.split(/\s+/))
      .reduce((a, b) => new Set([...a,...b]), [])
    ].sort()

    return (
      <div>
      <p>filter: {a.map(el => (<a key={el} href='#' onClick={
        e => {
          e.preventDefault()
          store.dispatch({ type: 'TOGGLE_TAG_ONLY', payload: el})
      }}>{el}</a>))} - {JSON.stringify(this.props.tags)}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return  {
    todos: state.todos,
    tags: state.tags,
  }
}

export default connect(mapStateToProps)(Tags)
