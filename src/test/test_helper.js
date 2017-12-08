// this is all node ↓
import jsdom from 'jsdom'
// the _$ version of jquery allows us to make use of different window (provided)
// by jsdom
import _$ from 'jquery'

import TestUtils from 'react-addons-test-utils'
import React from 'react' // because we have JSX
import ReactDOM from 'react-dom'
import chai, { expect } from 'chai'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../src/reducers'

import chaiJquery from 'chai-jquery'

// Set up testing environment to run like a browser in the command line
// emulates a fake browser at global.document.
// (global is node's version of window)
global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
global.window = global.document.defaultView // this is for the fakejquery
// now we have jquery based on our jsdom:
const $ = _$(global.window)

//
// build 'renderComponent' helper that should render a given react class
// The argument signature is:
  // 1) ComponentClass: The Component Class
  // 2) props: props to be placed directly on to the component class
  // 3) state: Application (<Provider>) level state to inject into the redux store
function renderComponent (ComponentClass, props, state) {
  // this makes the intial render
  const componentInstance = TestUtils.renderIntoDocument(
    // we gotta create the store with our OWN reducers:
    // state gets passed in as an argument
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  )

  // produces the HTML ... then returns it as a jQuery object
  return $(ReactDOM.findDOMNode(componentInstance))
}

// USING JQUERY TO SIMULATE, NOT VANILLA JS:
// Build helper for simulating events
// $.fn adds a new method to jQuery. How nice. In this case, it's called 'simulate'
$.fn.simulate = function (eventName, value) {
  if (value) {
    // .val is jQuery's value identifier. So we can set a value into a form
    this.val(value)
  }
  // we give it [0] because we're using jQuery object and it's always in an NodeList
  TestUtils.Simulate[eventName](this[0])
}

// Sets up chai-jquery so we can run jQuery simplified test cases:
chaiJquery(chai, chai.util, $)

export { renderComponent, expect }
