
// const init = {
//   pbc: [],
//   calc_type: []
// }

//const offfilter = (state = {},  action) => {
const offfilter = (state = {},  action) => {
  let fields
  switch (action.type) {
    case 'LOAD_FILTER':
      return  {...state, [action.field]: [...action.values] }
    case 'CLEAR_ALL_FILTER':
      return {}
    case 'CLEAR_FILTER':
      return  {...state, [action.field]: [] }
    case 'ADD_OFF_FILTER':
      fields = state[action.field]
      if(fields === undefined){ fields = [] }
      if(fields.includes(action.value)){ return state }
      return  {...state, [action.field]: [...fields, action.value] }

    //returning an empty array as can do is ok
    case 'REMOVE_OFF_FILTER':

    fields = state[action.field]
    if(fields === undefined){ return state }

  //  const s = {...state}
  //  const f = fields.filter(f => f !== action.value)
  //  if(f.length === 0) {
  //    delete s[action.state]
  //    return s
  //  }else{
      return {...state, [action.field]: fields.filter(f => f !== action.value) }
  //  }
    case 'TOGGLE_OFF_FILTER':
      let a = 'ADD_OFF_FILTER'
      fields = state[action.field]
      if(fields === undefined){ return offfilter(state, { type: a, field: action.field, value: action.value}) }
      if(fields.includes(action.value)){ a = 'REMOVE_OFF_FILTER' }
      return offfilter(state, { type: a, field: action.field, value: action.value})

    default:
    return state
  }
}

//console.log(offfilter(undefined,{ type: ''}));
//console.log(offfilter(undefined,{ type: 'FILTER_OFF_FIELD', field: 'pbc', value: 'Karl'}));
// let a1 = null
// a1 = offfilter(undefined,{ type: ''})
// //console.log(a1);
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'pbc', value: 'Karl'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'pbc', value: 'David'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'pbc', value: 'David'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'foo', value: 'foobar'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'foo', value: 'foobar'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'foo', value: 'foobarbaz'})
// //console.log(a1);
// a1 = offfilter(a1,{ type: 'REMOVE_OFF_FILTER', field: 'foo', value: 'foobar'})
// a1 = offfilter(a1,{ type: 'REMOVE_OFF_FILTER', field: 'foo', value: 'not ever here'})
// //a1 = offfilter(a1,{ type: 'REMOVE_OFF_FILTER', field: 'foo', value: 'foobarbaz'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'foo', value: 'hey'})
// a1 = offfilter(a1,{ type: 'REMOVE_OFF_FILTER', field: 'foo', value: 'hey'})
// a1 = offfilter(a1,{ type: 'ADD_OFF_FILTER', field: 'foo', value: ''})
// a1 = offfilter(a1,{ type: 'REMOVE_OFF_FILTER', field: 'foo', value: ''})
//
//console.log(a1);

// const array = [
//   { pbc: 'Brian', foo: '1'},
//   { pbc: 'Karl', foo: '2'},
//   { pbc: 'Ralph', foo: '1'},
//   { pbc: 'Ralph', foo: '1'},
//   { pbc: 'Ralph', foo: 'foobarbaz'},
//   { pbc: 'David', foo: 'foobarbaz'},
//   { foo: 'foobarbaz'},
//   { bar: 6 },
// ]

export const offfilter_filter = (off, arr) => {
  let ans = arr
  Object.keys(off).forEach(key => {
    //const v = off[key]
    //if(v ==='completed'){ v.map(x => String(x))}

    ans = ans.filter(x => !off[key].includes(x[key]))
  })
  return ans
}

// console.log('--');
// //console.log(array)
//console.log(offfilter_filter(a1, array))
// console.log('--');



export default offfilter
