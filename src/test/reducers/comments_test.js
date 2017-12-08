import { expect } from '../test_helper'
import commentReducer from '../../src/reducers/comments'
import { ADD_COMMENT } from '../../src/actions/types'

describe('Comments Reducer', () => {
  it('handles action with unknown type', () => {
    // expect(commentReducer()).to.be.instanceOf(Array)
    // ↑↓ either or... this is better because it's assumed empty ↓
    expect(commentReducer(undefined, {})).to.be.eql([])
  })

  // we can be brief by just using the reducer ↓
  it('handles action of type ADD_COMMENT', () => {
    const action = {
      type: ADD_COMMENT,
      payload: 'test comment'
    }
    expect(commentReducer([], action)).to.eql(['test comment'])
  })
})
