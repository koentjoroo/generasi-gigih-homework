import { Heading, Flex, Center, Button, useDisclosure } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../store'
import { clearSelectedTracks } from '../store/playlist'
import Track from '../components/track'
import CreatePlaylistModal from '../components/create-playlist-modal'

const CreatePlaylist = () => {
  const dispatch = useAppDispatch()
  const { tracks, selectedTracks } = useAppSelector(state => state.playlist)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 }
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Heading as="h2" size="lg">
          Tracks
        </Heading>
        <Center>
          <Button
            leftIcon={<DeleteIcon />}
            onClick={() => dispatch(clearSelectedTracks())}
            type="button"
            variant="ghost"
            disabled={selectedTracks.length === 0}
          >
            Clear Selection
          </Button>
          <Button
            leftIcon={<AddIcon />}
            onClick={onOpen}
            disabled={selectedTracks.length === 0}
            ml={2}
          >
            Create Playlist
          </Button>
        </Center>
      </Flex>
      {tracks.length > 0 && (
      <motion.div variants={container} initial="hidden" animate="show" exit="exit">
        {tracks.map(track => (
          <motion.div variants={item}>
            <Track track={track} key={track.id} />
          </motion.div>
        ))}
      </motion.div>
      )}
      <CreatePlaylistModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default CreatePlaylist
