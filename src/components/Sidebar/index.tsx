import { Flex, Icon, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { MdHome, MdLibraryMusic } from 'react-icons/md'
import { IconType } from 'react-icons'

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

const SidebarItem = ({ icon, children, to }: SidebarItemProps) => {
  const bg = useColorModeValue('white', '#262626')
  return (
    <Flex
      alignItems="center"
      mt={2}
      py={2}
      px={4}
      borderRadius="lg"
      as={NavLink}
      exact
      activeStyle={{ background: bg }}
      _hover={{ bg }}
      to={to}
    >
      <Icon as={icon} mr={4} /> {children}
    </Flex>
  )
}

interface SidebarItemProps {
  icon: IconType,
  children: React.ReactNode,
  to: string
}

export default Sidebar
