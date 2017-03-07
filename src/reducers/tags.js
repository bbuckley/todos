

// const tags = (state = [], action) => {
//   switch (action.type) {
//     case 'TOGGLE_TAG_ONLY':
//       return (action.payload === state[0]) ?
//         [] : [action.payload]
//     case 'TOGGLE_TAG':
//       if(!state.includes(action.payload)){
//         return [...state, action.payload]
//       }else{
//         return state.filter(x => x !== action.payload)
//       }
//     case 'ADD_TAG':
//       if(state.includes(action.payload)){ return state }
//       return [...state, action.payload]
//     case 'REMOVE_TAG':
//       return state.filter(x => x !== action.payload)
//     case 'REMOVE_ALL_TAGs':
//       state = []
//     default:
//       return state
//   }
// }

const tags = (state = [], { type, payload }) => {
  switch (type) {
    case 'TOGGLE_TAG_ONLY':
      return (payload === state[0]) ?
        [] : [payload]
    case 'TOGGLE_TAG':
      if(!state.includes(payload)){
        return [...state, payload]
      }else{
        return state.filter(x => x !== payload)
      }
    case 'ADD_TAG':
      if(state.includes(payload)){ return state }
      return [...state, payload]
    case 'REMOVE_TAG':
      return state.filter(x => x !== payload)
    case 'REMOVE_ALL_TAGs':
      return []
    default:
      return state
  }
}

export default tags
