

import { v4 } from 'node-uuid'


export const  addExtend = (payload) => {
  return {
    type: 'ADD_EXTEND',
    payload,
  }
}

export const  addClone = (id) => {
  return {
    type: 'ADD_CLONE',
    id,
  }
}

export const  unedit = () => {
  return {
    type: 'UNEDIT',
  }
}

export const  editingField = (id, field) => {
  return {
    type: 'EDITING_FIELD',
    id,
    field,
  }
}
export const  editField = (id, field, value) => {
  return {
    type: 'EDIT_FIELD',
    id,
    field,
    value,
  }
}

export const  loadFilter = (field, values) => {
  return {
    type: 'LOAD_FILTER',
    field,
    values,
  }
}

export const  clearAllFilter = () => {
  return {
    type: 'CLEAR_ALL_FILTER',
  }
}

export const  clearFilter = (field) => {
  return {
    type: 'CLEAR_FILTER',
    field,
  }
}

export const  toggleOffFilter = (field, value) => {
  return {
    type: 'TOGGLE_OFF_FILTER',
    field,
    value,
  }
}
export const  addOffFilter = (field, value) => {
  return {
    type: 'ADD_OFF_FILTER',
    field,
    value,
  }
}

export const replaceFilter = (filter) => {
  return {
    type: 'REPLACE_FILTER',
    filter,
  }
}

export const addSamples = (n = 1) => {
  return {
    type: 'ADD_SAMPLES',
    n,
  }
}

//expect a to have good ids
export const replaceSamplesConcrete = (payload) => {
  return {
    type: 'REPLACE_SAMPLES_CONCRETE',
    payload,
  }
}

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text,
  }
}

export const toggleSort = (field) => {
  return {
    type: 'TOGGLE_SORT',
    field,
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const setFilterText = (filtertext) => {
  return {
    type: 'SET_FILTERTEXT',
    filtertext
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const setEdit = (id) => {
  return {
    type: 'EDITTING',
    id
  }
}

//payload of form { id: xxx, text: 'blah, blah, blah': complete: true }
export const editTodo = (payload) => {
  return {
    type: 'EDIT_TODO',
    payload
  }
}

export const delTodo = (id) => {
  return {
    type: 'DEL_TODO',
    id
  }
}

export const delFirebase = (id) => {
  return {
    type: 'DEL_FIREBASE',
    id
  }
}
