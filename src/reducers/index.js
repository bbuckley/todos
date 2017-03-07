import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import editReducer from './EditReducer'
import filterer from './filterer'
import sorter from './sorter'
import offfilter from './offfilter'
import edit_field from './edit_field'
import tags from './tags'
import filters from './filters'


import Rebase from 're-base'
export const base = Rebase.createClass({
  apiKey: "AIzaSyB63Tv78BGvNIsdccQHkPZv9T6n5ZPq__8",
  authDomain: "testerbkb.firebaseapp.com",
  databaseURL: "https://testerbkb.firebaseio.com",
  storageBucket: "testerbkb.appspot.com",
  messagingSenderId: "464556173301"
})
//firebase.initializeApp(base);

const del = (state = [], action) => {
  switch (action.type) {
    case 'DEL_TODO':
    const i = state.todos.findIndex(({id}) => id === action.id)
    const todos =  [...state.todos.slice(0, i),...state.todos.slice(i + 1)]

    base.database().ref('tcs/' + action.id).remove()
    //const k = 'key22';
    //ref.child(k).remove() //works

    return { ...state, todos, editReducer: 'none' }
    default:
    return state
  }
}

const todoAppx = combineReducers({
  offfilter: offfilter,
  todos,
  visibilityFilter,
  editReducer,
  filterer,
  sorter,
  edit_field,
  filters,
  tags,
})

const todoApp = (state = undefined, action) => {
  if (action.type === 'CLEAR') {
    state = undefined
  }
  let intermediateState =  todoAppx(state, action)

  intermediateState =  del(intermediateState, action)

  return intermediateState
}


export default todoApp
