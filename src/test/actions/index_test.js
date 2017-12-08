// test driven development
  // write implementation first
  // no need for renderComponent or a compoennt because we're not rendering!
import { expect } from '../test_helper'
import { ADD_COMMENT } from '../../src/actions/types'
import { addComment } from '../../src/actions'

// top level describe
describe('actions', () => {
  // inside level action; we're more precise in these lower-level areas
  describe('addComment', () => {
    it('has the correct type', () => {
      const action = addComment()
      expect(action.type).to.equal(ADD_COMMENT)
    })
    it('has the correct payload', () => {
      const action = addComment('test comment')
      expect(action.payload).to.equal('test comment')
    })
  })
})
