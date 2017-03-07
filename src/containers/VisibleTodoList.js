import { connect } from 'react-redux'
import { toggleTodo, setEdit } from '../actions'
import TodoList from '../components/TodoList'


// const sort = (a,b) => {
//   const x = 'text'
//   let a1 = a[x]
//   let b1 = b[x]
//   if(a1 === undefined) a1 = 'zzzzzz'
//   if(b1 === undefined) b1 = 'zzzzzz'
//   a1 = a1.toLowerCase()
//   b1 = b1.toLowerCase()
//
//   if (a1 < b1) return -1
//   if (a1 > b1) return 1
//   return 0
// }
//
// const sortr = (a,b) => {
//   const x = 'text'
//   let a1 = a[x]
//   let b1 = b[x]
//   if(a1 === undefined) a1 = 'zzzzzz'
//   if(b1 === undefined) b1 = 'zzzzzz'
//   a1 = a1.toLowerCase()
//   b1 = b1.toLowerCase()
//
//   if (a1 < b1) return 1
//   if (a1 > b1) return -1
//   return 0
// }

// const m = {
//   "1": sort,
//   '2': sort1
// }

const getVisibleTodos = (todos, filter, filterer) => {
  switch (filter) {
    case 'SHOW_ALL':
      //return (filterer === 1  ? todos.sort(sort) : todos.sort(sortr))
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter, state.filterer),
    filterer: state.filterer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
      dispatch(setEdit(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
