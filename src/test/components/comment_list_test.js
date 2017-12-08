import { renderComponent, expect } from '../test_helper'
import CommentList from '../../src/components/comment_list'

describe('CommentList', () => {
  let component
  beforeEach(() => {
    const props = { comments: ['Test Comment 1', 'Test Comment 2'] }
    component = renderComponent(CommentList, null, props)
  })

  it('shows an "li" for each comment', () => {
    expect(component.find('li').length).to.equal(2)
  })

  it('shows each comment that is provided', () => {
    expect(component).to.contain('Test Comment 1')
    expect(component).to.contain('Test Comment 2')
  })

})