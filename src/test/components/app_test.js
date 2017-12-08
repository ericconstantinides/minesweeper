import { renderComponent, expect } from '../test_helper'
// what we want to test:
import App from '../../src/components/app'

// Use 'describe' to group together similar tests with a single string:
describe('App', () => {
  // Use 'it' to test a single attribute of a target
  // the string is only used in the final report
  // tries to make an assertion about a very particular fact about the test subject
  // it('shows the correct text', () => {
    // create an instace of App
    // const component = renderComponent(App)
    // use 'expect' to make an 'assertion' about a target
    // matcher:
    // expect(component).to.contain('React simple starter')
  // })
  let component
  beforeEach(() => {
    component = renderComponent(App)
  })
  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist
  })
  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist
  })
})
