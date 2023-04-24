// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData = null
  const handleSubmit = data => (submittedData = data)

  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()

  const username = 'username'
  const password = 'password'

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const button = screen.getByRole('button', {name: /submit/i})
  await userEvent.click(button)

  expect(submittedData).toEqual({username, password})
})
