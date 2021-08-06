import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heading, Flex, Center, Button } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { clearSelectedTracks } from '../store/playlist'
import Track from '../components/Track'
import Modal from '../components/Modal'
import PlaylistForm from '../components/PlaylistForm'

const CreatePlaylist = () => {
  const dispatch = useDispatch()
  const { tracks, selectedTracks } = useSelector(state => state.playlist)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <Flex align="center" justify="space-between" >
        <Heading as="h2" size="lg">Tracks</Heading>
        <Center>
          <Button
            onClick={() => dispatch(clearSelectedTracks())}
            type="button"
            variant="ghost"
            color="trueGray.300"
            _hover={{ bg: 'trueGray.800' }}
            disabled={selectedTracks.length === 0}
          >
            Clear Selection
          </Button>
          <Button
            leftIcon={<FaPlus />}
            onClick={() => setIsModalOpen(true)}
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
      <Modal
        title="Create Playlist"
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <PlaylistForm />
      </Modal>
    </div>
  )
}

export default CreatePlaylist
