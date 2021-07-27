import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import data from '../data/sample'
import Link from '../components/Link'
import Navbar from '../components/Navbar'
import Track from '../components/Track'
import PlaylistForm from '../components/PlaylistForm'
import Main from '../layout/Main'
import {
  getProfile,
  getTracks,
  postPlaylist,
  postPlaylistTracks,
  spotifyAuthUrl,
} from '../libs/spotify'
import { useAuth } from '../libs/useAuth'
import { storeUser } from '../store/auth'

// TODO: Refactor the code
const SearchTrack = () => {
  const { isAuthenticated, accessToken } = useAuth()

  return isAuthenticated ? (
    <AuthPage accessToken={accessToken} />
  ) : (
    <UnauthPage />
  )
}

const UnauthPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>
        Before using the app, pwease login to Spotify
        <Link to={spotifyAuthUrl()}>
          <span style={{ color: 'white' }}> here</span>
        </Link>
        .
      </p>
    </div>
  )
}

const AuthPage = props => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const [tracks, setTracks] = useState(data)
  const [selectedTracks, setSelectedTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    getProfile(props.accessToken).then(user => dispatch(storeUser(user)))
  }, [])

  const handleFormChanges = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSelect = uri => {
    if (selectedTracks.includes(uri)) {
      let newTracks = selectedTracks.filter(track => track !== uri)
      setSelectedTracks(newTracks)
    } else {
      setSelectedTracks([...selectedTracks, uri])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    postPlaylist(props.accessToken, user.id, {
      name: form.title,
      description: form.description,
      public: false,
    }).then(playlist => {
      return postPlaylistTracks(props.accessToken, playlist.id, {
        uris: selectedTracks
      })
    }).then(() => {
      setSelectedTracks([])
      alert('Playlist created')
    })
  }

  const handleSearch = q => {
    setIsLoading(true)
    getTracks(props.accessToken, {
      q,
      type: 'track',
      limit: 12,
    }).then(res => {
      setTracks(res.tracks.items)
      setIsLoading(false)
    })
  }

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <Main>
        <div>
          <h3>Tracks</h3>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            tracks.map(track => {
              const isSelected = selectedTracks.includes(track.uri)
              return (
                <Track
                  track={track}
                  handleSelect={handleSelect}
                  isSelected={isSelected}
                  key={track.id}
                />
              )
            })
          )}
        </div>
        <PlaylistForm
          form={form}
          handleSubmit={handleSubmit}
          handleFormChanges={handleFormChanges}
        />
      </Main>
    </div>
  )
}

export default SearchTrack
