import 'App.css'
import theme from 'theme'
import Homepage from 'pages/homepage'
import CreatePlaylist from 'pages/create-playlist'
import Header from 'components/header'
import Sidebar from 'components/sidebar'
import { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAppSelector } from 'store'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <main>
          <Sidebar />
          <Switch>
            <Route exact path='/create-playlist' >
              { isAuthenticated ? <CreatePlaylist /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/' >
              <Homepage />
            </Route>
          </Switch>
          </main>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  )
}

export default App
