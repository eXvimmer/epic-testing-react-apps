// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function TestComponent() {
  const {count, decrement, increment} = useCounter()
  return (
    <>
      <h1>Current count: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestComponent />)
  const countEl = screen.getByText(/current count/i)
  expect(countEl).toHaveTextContent('Current count: 0')

  await userEvent.click(screen.getByRole('button', {name: '+'}))
  expect(countEl).toHaveTextContent('Current count: 1')
  await userEvent.click(screen.getByRole('button', {name: '-'}))
  expect(countEl).toHaveTextContent('Current count: 0')
})
