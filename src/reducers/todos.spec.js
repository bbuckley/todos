import todos from './todos'
import { addSamples } from '../actions/index'
import { addClone } from '../actions/index'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual([])
  })
  it('should handle loading data', () => {
    const a = addSamples(2)
    expect(todos([], a).length).toEqual(2)
  })

  it('should handle loading 1 life', () => {
    expect(todos(undefined, addSamples()).length).toEqual(1)
  })

  it('should handle a clone', () => {
    const state = todos(undefined, addSamples())
    const id = state[0].id
    expect(todos(state, addClone(id)).length).toEqual(2)
  })

  it('should handle extending array', () => {
    const a = []
    expect(todos(undefined, addExtend(a))).toEqual(a)
  })

})


// describe('todos reducer', () => {
//   it('should handle initial state', () => {
//     expect(todos(undefined, {})).toEqual([])
//   })
//   it('should handle ADD_TODO', () => {
//     expect(todos([], {
//       type: 'ADD_TODO',
//       text: 'Run the tests',
//       id: 0
//     })).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ])
//
//     expect(todos([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ], {
//       type: 'ADD_TODO',
//       text: 'Use Redux',
//       id: 1
//     })).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 1
//       }
//     ])
//
//     expect(todos([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 1
//       }
//     ], {
//       type: 'ADD_TODO',
//       text: 'Fix the tests',
//       id: 2
//     })).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 1
//       }, {
//         text: 'Fix the tests',
//         completed: false,
//         id: 2
//       }
//     ])
//   })
//
//   it('should handle TOGGLE_TODO', () => {
//     expect(todos([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 1
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ], {
//       type: 'TOGGLE_TODO',
//       id: 1
//     })).toEqual([
//       {
//         text: 'Run the tests',
//         completed: true,
//         id: 1
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })
//
// })
