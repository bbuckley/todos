import todoApp from './index'
import { addSamples, replaceSamplesConcrete, editingField, editField } from '../actions/index'
import { unedit } from '../actions/index'
import edit_field from './edit_field'

const orig = {
  edit_field: null,
  filterer: {
    completed: '',
    crd: '',
    ssn: '0',
    text: 'M'
  },
  offfilter: {},
  sorter: 'none',
  todos: [],
  visibilityFilter: 'SHOW_ALL',
}

describe('index reducer', () => {
  let orig
  let todo
  beforeEach(() => {
    todo = [
      { id: '222', calc_type: 'Modeling'},
      { id: '333', calc_type: 'Final'},
      { id: '444', calc_type: 'Final'},
    ]
    orig = {
      editReducer: 'none',
      edit_field: null,
      filterer: {
        completed: '',
        crd: '',
        ssn: '0',
        text: 'M'
      },
      offfilter: {},
      sorter: 'none',
      tags: [],
      todos: [],
      visibilityFilter: 'SHOW_ALL',
    }
  })

  // it('should should be pending!',()=>{pending()})

  it('should handle initial state', () => {
    expect(todoApp(undefined, {})).toEqual(orig)
  })

  it('should handle data load - couple of samples', () => {
    const state = todoApp(undefined, {})
    expect(todoApp(state, addSamples(4)).todos.length).toEqual(4)
  })

  it('should handle data load - couple of concrete', () => {
    const state = todoApp(undefined, {})
    expect(todoApp(state, replaceSamplesConcrete(todo)).todos.length).toEqual(3)
  })

  it('couple of concrete can be first dispatch', () => {
    expect(todoApp(undefined, replaceSamplesConcrete(todo)).todos.length).toEqual(3)
  })

  it('edit_field starts as null', () => {
    expect(todoApp(undefined, {}).edit_field).toEqual(null)
  })

  it('set edit_field to id and calc_type', () => {
    expect(todoApp(undefined, editingField('333', 'calc_type'))
      .edit_field).toEqual({id: '333', field: 'calc_type'})
  })

  it('set change id and calc_type', () => {
    const state = todoApp(undefined, editingField('333', 'calc_type'))
    expect(todoApp(state, editingField('444', 'calc_type'))
        .edit_field).toEqual({id: '444', field: 'calc_type'})
  })


  it('edit the value in a tc that is there', () => {
    const action = editField('444', 'calc_type', 'TermAB')
    const state = todoApp(undefined, replaceSamplesConcrete(todo))
    const todos = todoApp(state, action).todos
    const todos_new = [
      { id: '222', calc_type: 'Modeling'},
      { id: '333', calc_type: 'Final'},
      { id: '444', calc_type: 'TermAB'},
    ]
    expect(todos).toEqual(todos_new)
  })

  it('edit the value in a tc that is NOT there', () => {
    const action = editField('444', 'calc_type', 'TermAB')
    const todos = todoApp(undefined, action).todos
    expect(todos).toEqual([])
  })

  it('can unedit - init', () => {
    const action = unedit()
    expect(todoApp(undefined, action).edit_field).toEqual(null)
    expect(edit_field(undefined, action)).toEqual(null)

    const a1 = editingField('222','crd')
    let state1 = undefined
    expect(edit_field(state1, a1)).toEqual({ id: '222', field: 'crd'})
    let state2 = edit_field(state1, a1)
    expect(state2).toEqual({ id: '222', field: 'crd'})
    expect(edit_field({ id: '222', field: 'crd'}, unedit())).toEqual(null)
    expect(edit_field({ id: '222', field: 'crdxxx'}, action)).toEqual(null)
    expect(edit_field({ id: '222', field: 'crdxxx'}, a1)).toEqual({ id: '222', field: 'crd'})




  })


})
