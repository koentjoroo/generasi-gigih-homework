import { Flex, Button, Image, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addSelectedTracks,
  substractSelectedTracks,
} from '../../store/playlist'

const Track = ({ track }) => {
  const dispatch = useDispatch()
  const selectedTracks = useSelector(state => state.playlist.selectedTracks)

  const isSelected = selectedTracks.includes(track.uri)

  const handleSelect = () => {
    if (isSelected) {
      dispatch(substractSelectedTracks(track.uri))
    } else {
      dispatch(addSelectedTracks(track.uri))
    }
  }

  const artists = track.artists.map((artist, index) => {
    const isLast = index === track.artists.length - 1
    return (
      <a
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noreferrer"
        key={artist.id}
      >
        {artist.name + (isLast ? '' : ', ')}
      </a>
    )
  })

  const image = track.album.images.find(image => image.width === 64)

  return (
    <Flex align="center" my={2} p={2} borderRadius={4} bg="trueGray.800">
      <Image mr={4} borderRadius={2} src={image.url} alt={track.name} />
      <Flex direction="column" flex={1}>
        <Text fontWeight="bold">{track.name}</Text>
        <Text>{artists}</Text>
      </Flex>
      <Flex>
        <Button
          onClick={handleSelect}
          m={2}
          variant="solid"
          bg={isSelected ? 'transparent' : 'brand.600'}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Track
