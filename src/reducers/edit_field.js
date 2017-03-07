

const edit_field = (state = null, action) => {
  switch (action.type) {
    case 'EDITING_FIELD':
        return {
          id: action.id,
          field: action.field,
        }
    case 'UNEDIT':
        console.log('in unedit');
        return null
    default:
      return state
  }
}

export default edit_field
