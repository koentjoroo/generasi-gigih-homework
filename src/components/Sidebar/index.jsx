import { Flex, Icon } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { MdHome, MdLibraryMusic } from 'react-icons/md'

const Sidebar = () => {
  return (
    <Flex as="nav" direction="column">
      <SidebarItem to="/" icon={MdHome}>
        Home
      </SidebarItem>
      <SidebarItem to="/create-playlist" icon={MdLibraryMusic}>
        Create Playlist
      </SidebarItem>
    </Flex>
  )
}

const SidebarItem = ({ icon, children, ...props }) => {
  return (
    <Flex
      alignItems="center"
      mt={2}
      py={2}
      px={4}
      borderRadius={4}
      as={NavLink}
      exact
      activeStyle={{ backgroundColor: '#262626' }}
      _hover={{ bg: 'trueGray.800' }}
      {...props}
    >
      <Icon as={icon} mr={4} /> {children}
    </Flex>
  )
}

export default Sidebar
