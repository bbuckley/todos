
import { samples } from './samples'
import { v4 } from 'node-uuid'

import { base } from './index'


const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: 'false'
      }
    // case 'EDIT_TODO':
    //   return {
    //     id: action.id,
    //     text: action.text,
    //     completed: action.completed
    //   }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        // completed: !state.completed //fix
        completed: (!(state.completed === 'true')) ? 'false' : 'true'
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  let i
  switch (action.type) {
    case 'ADD_CLONE':
    i = state.findIndex(({id}) => id === action.id)
    if (i === -1) {
      return state
    } else {
      const newTc = JSON.parse(JSON.stringify(state[i]))
      newTc.id = v4()
      return [...state.slice(0, i), newTc ,...state.slice(i)]
    }

    case 'EDIT_FIELD':
    console.log('here', action.id, action.field, action.value);
    base.database().ref('tcs/' + action.id +'/').update({ [action.field]: action.value })

    i = state.findIndex(({id}) => id === action.id)
    if (i === -1) {
      return state
    } else {
      const newTc = { ...state[i], [action.field]: action.value }
      return [...state.slice(0, i), newTc ,...state.slice(i + 1)]
    }

    case 'EDIT_TODO':
    i = state.findIndex(({id}) => id === action.payload.id)
    if (i === -1) {
      return state
    } else {
      return [...state.slice(0, i), action.payload ,...state.slice(i + 1)]
    }

    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
      case 'TOGGLE_TODO':
        return state.map(t =>
          todo(t, action)
        )
      case 'ADD_SAMPLES':
        return [...state, ...samples(action.n)]

      case 'REPLACE_SAMPLES_CONCRETE':
        return [...action.payload]

      case 'ADD_EXTEND':
        return [...state, ...action.payload]


    default:
      return state
  }
}

export default todos
