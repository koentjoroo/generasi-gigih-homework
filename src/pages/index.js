import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import data from '../data/sample'
import Navbar from '../components/Navbar'
import Track from '../components/Track'
import PlaylistForm from '../components/PlaylistForm'
import Button from '../components/Button'
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
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const { isAuthenticated, accessToken } = useAuth()

  const [tracks, setTracks] = useState(data)
  const [selectedTracks, setSelectedTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(accessToken).then(user => dispatch(storeUser(user)))
    }
  }, [isAuthenticated, accessToken])

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
    postPlaylist(accessToken, user.id, {
      name: form.title,
      description: form.description,
      public: false,
    })
      .then(playlist => {
        return postPlaylistTracks(accessToken, playlist.id, {
          uris: selectedTracks,
        })
      })
      .then(() => {
        setSelectedTracks([])
        alert('Playlist created')
      })
  }

  const handleSearch = q => {
    setIsLoading(true)
    getTracks(accessToken, {
      q,
      type: 'track',
      limit: 12,
    }).then(res => {
      setTracks(res.tracks.items)
      setIsLoading(false)
    })
  }

  const clearSelection = () => {
    setSelectedTracks([])
  }

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <Main>
        <div>Sidebar WIP...</div>
        <div>
          <h2>Tracks</h2>
          {isLoading ? (
            <p>Loading...</p>
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
          clearSelection={clearSelection}
        />
      </Main>
    </div>
  )
}

export default SearchTrack
