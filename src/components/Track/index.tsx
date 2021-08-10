import { Flex, Button, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store'
import { Artist, Track as SpotifyTrack, Image as SpotifyImage } from 'types/spotify'
import { addSelectedTracks, substractSelectedTracks } from 'store/playlist'
import * as React from 'react'

const Track = ({ track }: { track: SpotifyTrack }) => {
  const dispatch = useAppDispatch()
  const selectedTracks = useAppSelector(state => state.playlist.selectedTracks)

  const isSelected: boolean = selectedTracks.includes(track.uri)

  const handleSelect: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isSelected) {
      dispatch(substractSelectedTracks(track.uri))
    } else {
      dispatch(addSelectedTracks(track.uri))
    }
  }

  const artists: JSX.Element[] = track.artists.map(
    (artist: Artist, index: number) => {
      const isLast: boolean = index === track.artists.length - 1
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
    }
  )

  const image: SpotifyImage | undefined = track.album.images.find(
    (image: SpotifyImage) => image.width === 64
  )

  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Flex align="center" my={2} p={2} borderRadius="lg" bg={bg}>
      <Image mr={4} borderRadius={2} src={image?.url} alt={track.name} />
      <Flex direction="column" flex={1}>
        <Text fontWeight="bold">{track.name}</Text>
        <Text>{artists}</Text>
      </Flex>
      <Flex>
        <Button
          onClick={handleSelect}
          m={2}
          variant={isSelected ? 'ghost' : 'solid'}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Track
