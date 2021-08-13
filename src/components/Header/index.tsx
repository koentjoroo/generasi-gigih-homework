import {
  Flex,
  Grid,
  Center,
  Text,
  Link,
  Input,
  Button,
  IconButton,
  useToast,
  useColorMode,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Switch,
} from '@chakra-ui/react'
import { ChevronDownIcon, Search2Icon, MoonIcon, SunIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { FaSpotify } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from 'store'
import { useState } from 'react'
import { setTracks } from 'store/playlist'
import { logout } from 'store/auth'
import { authorize, getTracks } from 'libs/spotify'
import * as React from 'react'

const Header = () => {
  const [query, setQuery] = useState('')

  const mode = useColorModeValue
  const toast = useToast()
  const dispatch = useAppDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isAuthenticated, accessToken, user } = useAppSelector(state => state.auth)

  const isDark = colorMode === 'dark'

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
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
      limit: '12',
    }).then(res => dispatch(setTracks(res.tracks.items)))
  }

  return (
    <Grid templateColumns="15vw 1fr 15vw" gap={4}>
      <HeaderItem>
        <Link fontSize="xl" fontWeight="black" href="/" _hover={{ opacity: 0.8 }}>
          GenGIGIH
        </Link>
      </HeaderItem>
      <form onSubmit={handleSubmit}>
        <HeaderItem>
          <Input
            type="text"
            placeholder="Search..."
            mr={2}
            borderRadius="full"
            isDisabled={!isAuthenticated}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <IconButton isRound variant="ghost" icon={<Search2Icon />} aria-label="search" />
        </HeaderItem>
      </form>
      <HeaderItem>
        {isAuthenticated ? (
            <Menu closeOnSelect={false}>
              <MenuButton
                as={IconButton}
                variant={'ghost'}
                aria-label={'user-dropdown'}
                leftIcon={<ChevronDownIcon ml={2} />}
              >
                <Avatar
                  name={user?.display_name}
                  src={user?.images?.[0].url ?? 'https://picsum.photos/36'}
                  size={'sm'}
                  mr={2}
                ></Avatar>
              </MenuButton>
              <MenuList border={'none'}>
                <MenuGroup title={'Hello ' + user?.display_name}>
                  <MenuItem icon={isDark ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
                    <Flex w={'100%'} justify={'space-between'}>
                      <Text>Dark Mode</Text>
                      <Switch id="toggle-dark-mode" isChecked={isDark} />
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    color={mode('red', 'red.600')}
                    icon={<ArrowBackIcon />}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
        ) : (
          <Button leftIcon={<FaSpotify />} colorScheme="brand" onClick={authorize}>
            Login to Spotify
          </Button>
        )}
      </HeaderItem>
    </Grid>
  )
}

const HeaderItem = (props: { children: React.ReactNode }) => {
  return (
    <Center w="100%" minH="72px">
      {props.children}
    </Center>
  )
}

export default Header
