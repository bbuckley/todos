
import React from 'react'
import { store } from '../index'
import { addSamples, addExtend } from '../actions/index'
import { samples } from '../reducers/samples'

import { v4 } from 'node-uuid'


const resetLocalStorage = () => {
  console.log("Clearing...")
  localStorage.setItem("brian", JSON.stringify({todos: []}))
  store.dispatch({ type: 'CLEAR' })
}

const setFour = () => {
  const s = samples()[0]
  const a = [
    { ...s, id: v4(), calc_type: 'UI1' },
    { ...s, id: v4(), calc_type: 'ModelingAB'},
    { ...s, id: v4(), calc_type: 'Modeling'},
    { ...s, id: v4(), calc_type: 'Final'},
  ]
  store.dispatch(addExtend(a));
}

const setClearEdit = () => {
  store.dispatch({ type: 'CLEAR_EDIT'})
}

const Clear = () => (
  <p>
    <button onClick={resetLocalStorage} >Clear all</button>
    <button onClick={setFour} >4 samples</button>
    <button onClick={setClearEdit} >Clear edit</button>
    <button onClick={
      () => store.dispatch({ type: 'TOGGLE_COMPLETED_FILTER' })
    } >Toggle completed</button>
    <button onClick={() => console.log('turn a filter on (and the rest off)')} >Set filter</button>
    <button onClick={() => store.dispatch(addSamples()) } >Add 1 sample</button>
    <button onClick={() => store.dispatch(addSamples(3)) } >Add 3 samples</button>
    <button onClick={() => store.dispatch(addSamples(3000)) } >Add 3000 samples</button>
    <button onClick={() => console.log(store.getState()) } >Log state</button>
  </p>
)

export default Clear
