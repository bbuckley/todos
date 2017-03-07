
const config = (state = {},  action) => {
  switch (action.type) {
    case 'CONFIG_COMPLETED':
    return  {...state, completed: action.id}  //0-all, 1-true only, 2-false only
    case 'CONFIG_PBC':
    return  {...state, pbc: action.name}
    default:
    return state
  }
}

const f1 = {
  type: 'FILTER_FIELD',
  field: 'pbc',
  value: 'Brian'
}
const f2 = {
  type: 'FILTER_FIELD',
  field: 'crd',
  value: '>= 12/31/1992, < 2/3/1999' // and
}
const f3 = {
  type: 'FILTER_FIELD',
  field: 'crd',
  value: '!= [12/31/1992], < 2/3/1999'
}

console.log(config({},
  { type: 'CONFIG_FILTER_FIELD',
    field: 'pbc',
    value: 'Brian'
}))

console.log(config({}, { type: 'CONFIG_COMPLETED', id: 0}))

const a = config({}, { type: 'CONFIG_COMPLETED', id: 0})
console.log(config(a, { type: 'CONFIG_PBC', name: 'Brian'}))

console.log(config(undefined , { type: 'xCOMPLETED_FILTER', id: 0}))

console.log(config(null , { type: 'xCOMPLETED_FILTER', id: 0}))

console.log({})
