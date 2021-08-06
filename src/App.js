import './App.css'
import theme from './theme'
import Homepage from './pages/Homepage'
import CreatePlaylist from './pages/CreatePlaylist'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth)
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
