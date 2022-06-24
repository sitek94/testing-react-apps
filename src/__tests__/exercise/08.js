// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  function TestComponent() {
    const {count, increment, decrement} = useCounter()

    return (
      <div>
        <div>Current count: {count}</div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    )
  }

  render(<TestComponent />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent(/current count: 0/i)
  await userEvent.click(increment)
  expect(message).toHaveTextContent(/current count: 1/i)
  await userEvent.click(decrement)
  expect(message).toHaveTextContent(/current count: 0/i)
})

test('uses fake component to test the hook', () => {
  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }
  render(<TestComponent />)
  const {increment, decrement} = result
  expect(result.count).toBe(0)
  act(() => increment())
  expect(result.count).toBe(1)
  act(() => decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
