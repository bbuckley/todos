
//{"todos":[{"id":"92417a02-1850-40f5-8efd-82deb462bfc7","text":"TermAB","completed":false},{"id":"9cd763bd-822d-4531-ab4b-e1a3aab4d292","text":"Final","completed":false},{"id":"a502aacd-f247-47eb-9aee-b0e3b273a0be","ssn":"123-67-0987","text":"Final","completed":false,"crd":"","notes":""},{"id":"42e2986d-52e3-456b-95f3-1d4ecd04ff48","text":"Modeling","completed":false},{"id":"b8cd149e-a6a3-40a5-98a9-4ff169220511","text":"Modeling","completed":false},{"id":"c8d63a7b-313c-473a-bbb9-cd310be62c21","text":"Modeling","completed":false},{"id":"4bffe06d-bcfd-4a33-8fef-4a7b81a92f4c","text":"Final","completed":true},{"id":"35718c3e-c737-436a-a44b-cf1112e6c34a","text":"TermAB","completed":false},{"id":"0d15c7cf-8414-4cf8-b665-dd265aea34b7","text":"TermAB","completed":false},{"id":"0d4a4d8a-3ef9-405d-b6ca-0fce75bf1934","text":"UI1","completed":true},{"id":"80cd8613-304b-4b2f-b062-f84034cb4f84","text":"UI1","completed":false},{"id":"038948fa-7a63-4390-939b-7a311a9fe20e","ssn":"333-88-9999","text":"UI1","completed":false,"crd":"","notes":""},{"id":"666c2745-96b0-4f61-8b18-e9799892f446","ssn":"111-00-0000","text":"paint the shed","completed":true,"crd":"","notes":""}],"visibilityFilter":"SHOW_ALL","editReducer":"038948fa-7a63-4390-939b-7a311a9fe20e","filterer":1,"sorter":"crd"}


const filter_map_init = {
  text: "M",
  crd: "",
  completed: "",
  ssn: "0",
}

// const filtermap_init = {
//   "default": filter_map_init,
//   "current": {
//     text: "xxx",
//     crd: "",
//     completed: "false",
//     ssn: "111",
//   }
// }




const filterer = (state = filter_map_init,  action) => {
  switch (action.type) {
    case 'TOGGLE_COMPLETED_FILTER':
    return  {...state, completed: !state.completed }  //0 - all, 1 - true only, 2 -false only
    case 'REPLACE_FILTER':
    return  action.filter
    case 'SET_FILTER':
    return  action.filter//(state + 1) % 3
    case 'SET_FILTERTEXT':
    console.log(action);
    return  {...state, text: action.filtertext }
    default:
    return state
  }

}

export default filterer


// console.log(filter_map_init);
// console.log(filtermap_init);
