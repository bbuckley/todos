import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


if(!localStorage.getItem("brian")){
  localStorage.setItem("brian", JSON.stringify({todos: []}))
}
export const store = createStore(reducer, JSON.parse(localStorage.getItem("brian")))
//export const store = createStore(reducer)
//export const store = createStore(reducer, JSON.parse(localStorage.getItem("brian")),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

store.subscribe(() => {
  console.log('am writing to local storage');
  //console.log('not writing to local storage');
  //console.log(store.getState())
  localStorage.setItem("brian", JSON.stringify(store.getState()))
})
//{"todos":[{"id":"c4d49eac-b911-42b0-91ea-432bceffd55b","text":"Modeling","completed":false},{"id":"e2cbd83f-0f2b-4d92-b631-d1e2ac7519a7","text":"TermAB","completed":false},{"id":"e3dc9fb6-97e9-4852-a6a0-4b91eeb10e79","text":"UI1","completed":true},{"id":"17997f97-fced-4fe5-b3f6-0a33f4b925d4","text":"Final","completed":true},{"id":"bd8a57f0-e43b-4952-a644-1d3c2b33ba17","text":"Modeling","completed":true},{"id":"75036685-0e8c-4e37-9fd0-a229f3bc2047","text":"TermAB","completed":false},{"id":"ebb0f874-b78a-4f92-85f8-7418a18fc32b","text":"UI1","completed":true},{"id":"e9f1cd24-0a0a-4be7-b6ee-15537e597325","text":"Final","completed":true}],"visibilityFilter":"SHOW_ALL","editReducer":"ebb0f874-b78a-4f92-85f8-7418a18fc32b"}
//{"todos":[{"id":"01867c5e-975f-4d71-99a5-80952230952e","text":"paint the shed","completed":false},{"id":"d0b80dcc-73c4-46f9-8029-d2d6e4dc2558","text":"wewqwqeqw","completed":false}],"visibilityFilter":"SHOW_ALL","editReducer":"01867c5e-975f-4d71-99a5-80952230952e"}
// var fs = require('fs');
// export const writeObject = (jsonObject = {}, fileName = './write/myFile')  => {
//   fs.writeFileSync(fileName, JSON.stringify(jsonObject, null, 1), 'utf8')
//   console.log("The file was saved, sync!, " + fileName);
//   return jsonObject
// }
//
// export const readObject = (fileName = './write/myFile') => {
//   return JSON.parse(fs.readFileSync(fileName, 'utf8'))
// }
//
//
// let unsubscribe = store.subscribe(() => {
//   console.log(store.getState())
//   writeObject(store.getState(), './src/junk')
// })
