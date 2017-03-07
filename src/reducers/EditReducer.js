
const editReducer = (state = 'none', action) => {
  switch (action.type) {
    case 'EDITTING':
      return action.id
    case 'CLEAR_EDIT':
      return 'none'
    default:
      return state
  }
}

export default editReducer
