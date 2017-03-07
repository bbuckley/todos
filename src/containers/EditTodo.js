import React from 'react'
import { connect } from 'react-redux'
//import { addTodo } from '../actions'
//import { setVisibilityFilter } from '../actions'
//import Link from '../components/Link'
//import TodoList from '../components/TodoList'

let EditTodo = ({ dispatch }) => {
  let input = "bar"

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        //dispatch(addTodo(input.value))
        input.value = ''
      }}>
      <input ref={node => {
        input = node
      }} />
      <input onChange={(e)=>{}} value='foo'/>

        <button type="submit">
          Edit Todo
        </button>
      </form>
    </div>
  )


}

//EditTodo = connect()(EditTodo)
//const mapStateToProps = (state, ownProps) => {
const mapStateToProps = (state) => {
  return  {
    //active: ownProps.filter === state.visibilityFilter
    //active: ownProps.id === state.editReducer
    id: state.editReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      //dispatch(setVisibilityFilter(ownProps.filter))
      //dispatch(setEdit(ownProps.id))
      console.log('dispatch')
    }
  }
}
// //
// // EditTodo = connect(
// //    mapStateToProps,
// //    mapDispatchToProps
// // )(TodoList)
//
// EditTodo = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(EditTodo)
connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTodo)

export default EditTodo
