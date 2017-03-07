

import { filters } from './filters'

describe('filters', () => {

  it('should handle initial state', () => {
    let state = filters(undefined, { type: 'TOGGLE_EXPAND' })
    expect(state).toEqual(true)
    state = filters(state, { type: 'TOGGLE_EXPAND' })
    expect(state).toEqual(false)
  })

  it('should handle invalid method', () => {
    let state = filters(undefined, { type: 'XTOGGLE_EXPAND' })
    expect(state).toEqual(false)
    state = filters(state, { type: 'XTOGGLE_EXPAND' })
    expect(state).toEqual(false)
    state = filters(state, { type: 'TOGGLE_EXPAND' })
    expect(state).toEqual(true)
  })

})
