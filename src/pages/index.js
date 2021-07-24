import { useSpotifyAuthentication } from '../libs/useSpotifyAuthentication'
import { useState, useEffect } from 'react'
import getSpotifyAuthUrl from '../utils/getSpotifyAuthUrl'
import fetchFromSpotifyApi from '../utils/fetchFromSpotifyApi'
import data from '../data/sample'
import Link from '../components/Link'
import Navbar from '../components/Navbar'
import Track from '../components/Track'
import PlaylistForm from '../components/PlaylistForm'
import Main from '../layout/Main'

// Still messyyyyeh. TODO: Refactor the code!
const SearchTrack = () => {
  const authenticationInfo = useSpotifyAuthentication()

  return authenticationInfo.isAuthenticated ? (
    <AuthPage accessToken={authenticationInfo.access_token} />
  ) : (
    <UnauthPage />
  )
}

const UnauthPage = () => {
  const spotifyAuthUrl = getSpotifyAuthUrl()
  return (
    <div style={{ textAlign: 'center' }}>
      <p>
        Before using the app, pwease login to Spotify
        <Link to={spotifyAuthUrl}>
          <span style={{ color: 'white' }}> here</span>
        </Link>
        .
      </p>
    </div>
  )
}

const AuthPage = props => {
  const [tracks, setTracks] = useState(data)
  const [selectedTracks, setSelectedTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    async function fetchData() {
    const user = await fetchFromSpotifyApi(
      'https://api.spotify.com/v1/me',
      props.accessToken
    )
    setUserId(user.id)
    }
    fetchData()
  }, [])

  const postPlaylist = async () => {
    return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + props.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.title,
        description: form.description,
        public: false,
      }),
    }).then(res => res.json())
  }

  const addItemToPlaylist = async id => {
    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + props.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        uris: selectedTracks
      }),
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const playlist = await postPlaylist()
    await addItemToPlaylist(playlist.id)
    alert('Playlist created')
  }

  const handleFormChanges = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSearch = async query => {
    setIsLoading(true)
    const SEARCH_API_ENDPOINT = `https://api.spotify.com/v1/search`
    const SEARCH_TYPE = `track`
    const URL = `${SEARCH_API_ENDPOINT}?q=${query}&type=${SEARCH_TYPE}`
    const result = await fetchFromSpotifyApi(URL, props.accessToken)
    setTracks(result.tracks.items)
    setIsLoading(false)
  }

  const handleSelect = uri => {
    if (selectedTracks.includes(uri)) {
      let newTracks = selectedTracks.filter(track => track !== uri)
      setSelectedTracks(newTracks)
    } else {
      setSelectedTracks([...selectedTracks, uri])
    }
  }

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <Main>
        <PlaylistForm
          form={form}
          handleSubmit={handleSubmit}
          handleFormChanges={handleFormChanges}
        />
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
      </Main>
    </div>
  )
}

export default SearchTrack
