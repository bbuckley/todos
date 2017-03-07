
import tags from './tags'
import todoApp from './index'

const skip = t => !(typeof(t.tags)==='undefined' || t.tags === null || t.tags.trim() === '')

describe('creating tag -  reducer', () => {
  let todo
  beforeEach(() => {
    todo = [
      { id: '11', calc_type: 'Modeling', tags: 'zoo'},
      { id: '111', calc_type: 'Modeling', tags: 'foo'},
      { id: '222', calc_type: 'Modeling', tags: ''},
      { id: '225', calc_type: 'Modeling', tags: ' '},
      { id: '226', calc_type: 'Modeling', tags: null},
      { id: '333', calc_type: 'Final'},
      { id: '444', calc_type: 'Final', tags: 'foo bar'},
      { id: '555', calc_type: 'Final', tags: 'foo bar baz'},
    ]
  })

  it('should handle initial state', () => {
    expect(todoApp(undefined, {}).tags).toEqual([])
  })

  it('should be able to clear tag', () => {
    const state = todoApp(undefined, {})
    expect(todoApp(state, { type: 'CLEAR_ALL'}).tags).toEqual([])
  })

  it('should be able to age tag', () => {
    const state = todoApp(undefined, {})
    expect(todoApp(state, { type: 'ADD_TAG', payload: 'foo'}).tags).toEqual(['foo'])
  })

  it('should not add a tag is already there', () => {
    const state = tags(['foo'], {})
    expect(tags(state, { type: 'ADD_TAG', payload: 'foo'})).toEqual(['foo'])
  })

  it('should be able to remove a tag', () => {
    const state = tags(['foo','bar'], {})
    expect(tags(state, { type: 'REMOVE_TAG', payload: 'foo'})).toEqual(['bar'])
  })

  it('should be able to remove a tag', () => {
    expect(tags(tags(['foo','bar'], {}), { type: 'REMOVE_TAG', payload: 'foo'})).toEqual(['bar'])
    expect(tags(tags(['bar'], {}), { type: 'REMOVE_TAG', payload: 'foo'})).toEqual(['bar'])
    expect(tags(tags([], {}), { type: 'REMOVE_TAG', payload: 'foo'})).toEqual([])
  })



  it('should be able to handle blank and null tags', () => {
    expect(tags(tags(['bar'], {}), { type: 'ADD_TAG', payload: ''})).toEqual(['bar',''])
    expect(tags(tags(['bar'], {}), { type: 'ADD_TAG', payload: null})).toEqual(['bar',null])

    expect(tags(tags(['bar'], {}), { type: 'REMOVE_TAG', payload: null})).toEqual(['bar'])
    expect(tags(tags(['bar',null], {}), { type: 'REMOVE_TAG', payload: null})).toEqual(['bar'])
  })


  it('should be able to parse strings', () => {
    expect('foo bar'.split(/\s+/)).toEqual(['foo','bar'])
    expect('foo'.split(/\s+/)).toEqual(['foo'])
    expect(todo.filter(t => typeof(t.tags)==='undefined' || t.tags === null || t.tags.trim() === '').length).toEqual(4)
    expect(todo.filter(t => !(typeof(t.tags)==='undefined' || t.tags === null || t.tags.trim() === '')).length).toEqual(4)
    expect(todo.filter(skip).length).toEqual(4)

    expect(
      [...new Set(
      todo
      .filter(skip)
      .map(x => x.tags.split(/\s+/))
      .reduce((a, b) => a.concat(b), [])
    )].sort()
    )
    .toEqual([...new Set(['zoo','foo','bar','baz'])].sort())

    expect(
      [...
      todo
      .filter(skip)
      .map(x => x.tags.split(/\s+/))
      .reduce((a, b) => new Set([...a,...b]), [])
    ].sort().join(' ')
    )
    .toEqual([...new Set(['zoo','foo','bar','baz'])].sort().join(' '))

    const a =
      [...
      todo
      .filter(skip)
      .map(x => x.tags.split(/\s+/))
      .reduce((a, b) => new Set([...a,...b]), [])
    ].sort()

    a.reduce((a, b) => {
      a[b]=0; return a
    }, {})

    const with_count =
      todo
      .filter(skip)
      .map(x => x.tags.split(/\s+/))
      .reduce((a, b) => {
        b.forEach(e => { e in a ? a[e]++ : a[e] = 1 })
        return a
      }, {})
     expect(with_count).toEqual({bar: 2, baz: 1, foo: 3, zoo: 1})
  })

  it('should be able to toggle a tag', () => {
    expect(tags(tags(['foo'], {}), { type: 'TOGGLE_TAG', payload: 'foo'})).toEqual([])
    expect(tags(tags([], {}), { type: 'TOGGLE_TAG', payload: 'foo'})).toEqual(['foo'])
  })

  it('should filter', () => {
    const tt = ['foo','bar']  //want if either/or
    todo = todo.filter(skip)
    expect(todo.length).toEqual(4)

    todo = todo.filter(x => {
      let match = false
      x.tags.split(/\s+/).forEach(a => {
        if(tt.includes(a)){ match = true }
      })
      return match
    })
    expect(todo.length).toEqual(3)
  })

  it('should filter', () => {
    const tt = ['zoo']
    todo = todo.filter(skip)
    expect(todo.length).toEqual(4)

    todo = todo.filter(x => {
      let match = false
      x.tags.split(/\s+/).forEach(a => {
        if(tt.includes(a)){ match = true }
      })
      return match
    })
    expect(todo.length).toEqual(1)
  })

  it('should be able to toggle a single filter',  () => {
    expect(tags(undefined, { type: 'TOGGLE_TAG_ONLY', payload: 'foo'})).toEqual(['foo'])
    expect(tags([], { type: 'TOGGLE_TAG_ONLY', payload: 'foo'})).toEqual(['foo'])
    expect(tags(['foo'], { type: 'TOGGLE_TAG_ONLY', payload: 'foo'})).toEqual([])
    expect(tags(['bar'], { type: 'TOGGLE_TAG_ONLY', payload: 'foo'})).toEqual(['foo'])
    expect(tags(['bar'], { type: 'TOGGLE_TAG_ONLY', payload: 'bar'})).toEqual([])
  })




})
