import { render, screen, fireEvent } from 'libs/test-utils'
import data from 'data/sample'
import Track from './index'

const setup = () => {
  const utils = render(<Track track={data[0]}/>)
  const image = screen.getByAltText(/bohemian rhapsody - remastered 2011/i)
  const title = screen.getByText(/bohemian rhapsody - remastered 2011/i)
  const artist = screen.getByText(/queen/i)
  const select = screen.getByText(/select/i)

  return { image, title, artist, select, ...utils}
}

test('track should render properly', () => {
  const { image, title, artist, select } = setup()

  expect(image).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(artist).toBeInTheDocument()
  expect(select).toBeInTheDocument()
})

test('select button should change when clicked', () => {
  const { select } = setup()

  expect(select).toBeInTheDocument()

  fireEvent.click(select)
  expect(select.textContent).toBe('Deselect')

  fireEvent.click(select)
  expect(select.textContent).toBe('Select')
})