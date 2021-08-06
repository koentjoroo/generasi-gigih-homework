import { Center, Text } from '@chakra-ui/react'
import { useAuth } from '../libs/useAuth'

const Homepage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Center bg="trueGray.800" borderRadius={4}>
      {isAuthenticated ? (
        <Text>You are authorized</Text>
      ) : (
        <Text>
          Pwease authorize yourself by clicking that nice looking button on
          <strong> top-right</strong> corner of the page before using this app.
        </Text>
      )}
    </Center>
  )
}

export default Homepage
