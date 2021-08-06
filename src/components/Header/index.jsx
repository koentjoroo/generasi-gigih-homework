import {
  Grid,
  Center,
  Text,
  Link,
  Input,
  Button,
  IconButton,
  useToast,
  Avatar,
} from '@chakra-ui/react'
import { FiSearch, FiActivity } from 'react-icons/fi'
import { FaSpotify } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setTracks } from '../../store/playlist'
import { authorize, getTracks } from '../../libs/spotify'

const Header = () => {
  const [query, setQuery] = useState('')

  const dispatch = useDispatch()
  const toast = useToast()
  const { isAuthenticated, accessToken, user } = useSelector(
    state => state.auth
  )

  const handleSubmit = e => {
    e.preventDefault()
    if (query.length <= 3) {
      return toast({
        title: 'Query Error!',
        description: 'Query must have at least 3 letters.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    getTracks(accessToken, {
      q: query,
      type: 'track',
      limit: 12,
    }).then(res => dispatch(setTracks(res.tracks.items)))
  }

  return (
    <Grid templateColumns="15vw 1fr 15vw" gap={4}>
      <HeaderItem>
        <Link
          fontSize="xl"
          fontWeight="black"
          href="/"
          _hover={{ opacity: 0.8 }}
        >
          GenGIGIH
        </Link>
      </HeaderItem>
      <form onSubmit={handleSubmit}>
        <HeaderItem>
          <Input
            type="text"
            placeholder="Search..."
            mr={2}
            bg="trueGray.800"
            borderRadius="64px"
            isDisabled={!isAuthenticated}
            value={query}
            onChange={e => setQuery(e.target.value)}
            _hover={{  }}
            _placeholder={{ color: 'trueGray.400' }}
          />
          <IconButton
            isRound
            variant="ghost"
            icon={<FiSearch />}
            _hover={{ bg: 'trueGray.800' }}
          />
        </HeaderItem>
      </form>
      <HeaderItem>
        {isAuthenticated ? (
          <>
            <Text mr={4} fontWeight="bold">
              {user.display_name}
            </Text>
            <Avatar
              name={user.display_name}
              src={user.images?.[0].url ?? 'https://picsum.photos/36'}
            ></Avatar>
          </>
        ) : (
          <Button
            leftIcon={<FaSpotify />}
            colorScheme="brand"
            onClick={authorize}
          >
            Login to Spotify
          </Button>
        )}
      </HeaderItem>
    </Grid>
  )
}

const HeaderItem = props => {
  return (
    <Center w="100%" h="72px">
      {props.children}
    </Center>
  )
}

export default Header
