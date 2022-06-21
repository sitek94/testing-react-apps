// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
jest.mock('react-use-geolocation')

test("shows an error message when can't get location", async () => {
  let setReturnValue
  function useCurrentPositionMock() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useCurrentPositionMock)

  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  const errorMsg = 'Something went wrong'
  act(() => {
    setReturnValue([null, {message: errorMsg}])
  })

  expect(screen.getByRole('alert')).toHaveTextContent(errorMsg)
})

/*
eslint
  no-unused-vars: "off",
*/
