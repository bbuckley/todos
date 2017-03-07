

const sorter = (state = 'none',  action) => {
  switch (action.type) {
    case 'TOGGLE_SORT':
    if(state === action.field){
      return '!'+action.field  
    }else{
      return action.field
    }
    case 'SET_SORTER':
    return  state === 1 ? 2 : 1
    default:
    return state
  }
}

export default sorter
