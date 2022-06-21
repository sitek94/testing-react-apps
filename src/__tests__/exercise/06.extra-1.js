// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 37.774929,
      longitude: -122.419416,
    },
  }

  let setReturnValue
  function useCurrentPositionMock() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useCurrentPositionMock)

  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.getByText(/latitude/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude/i)).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
