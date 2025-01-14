// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmitMock = jest.fn()

  render(<Login onSubmit={handleSubmitMock} />)
  // screen.debug()

  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const button = screen.getByRole('button', {name: /submit/i})
  await userEvent.click(button)

  expect(handleSubmitMock).toHaveBeenCalledWith({username, password})
  expect(handleSubmitMock).toHaveBeenCalledTimes(1)
})
