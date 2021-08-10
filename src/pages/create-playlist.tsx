import { useAppDispatch, useAppSelector } from 'store'
import { Heading, Flex, Center, Button, useDisclosure } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { clearSelectedTracks } from 'store/playlist'
import Track from 'components/track'
import CreatePlaylistModal from 'components/create-playlist-modal'

const CreatePlaylist = () => {
  const dispatch = useAppDispatch()
  const { tracks, selectedTracks } = useAppSelector(state => state.playlist)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Flex align="center" justify="space-between" >
        <Heading as="h2" size="lg">Tracks</Heading>
        <Center>
          <Button
            onClick={() => dispatch(clearSelectedTracks())}
            type="button"
            variant="ghost"
            disabled={selectedTracks.length === 0}
          >
            Clear Selection
          </Button>
          <Button
            leftIcon={<FaPlus />}
            onClick={onOpen}
            disabled={selectedTracks.length === 0}
            ml={2}
          >
            Create Playlist
          </Button>
        </Center>
      </Flex>
      <div>
        {tracks.map(track => (
          <Track track={track} key={track.id} />
        ))}
      </div>
      <CreatePlaylistModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default CreatePlaylist
