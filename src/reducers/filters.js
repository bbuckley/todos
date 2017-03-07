

const filters = (state = false,  action) => {
  switch (action.type) {
    case 'TOGGLE_EXPAND':
      return !state
    default:
      return state
  }
}

  export default filters
