// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)

  expect(result.count).toBe(0)

  act(result.increment)
  expect(result.count).toBe(1)

  act(result.decrement)
  expect(result.count).toBe(0)
})

function setup(...args) {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter(...args))
    return null
  }

  render(<TestComponent />)
  return result
}

test('allows customization of initial count', () => {
  const counterData = setup({initialCount: 2})

  expect(counterData.count).toBe(2)

  act(() => counterData.increment())
  expect(counterData.count).toBe(3)

  act(() => counterData.decrement())
  expect(counterData.count).toBe(2)
})

test('allows customization of the step', () => {
  const counterData = setup({step: 2})
  expect(counterData.count).toBe(0)

  act(counterData.increment)
  expect(counterData.count).toBe(2)

  act(counterData.decrement)
  expect(counterData.count).toBe(0)
})
