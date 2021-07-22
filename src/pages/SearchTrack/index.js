import { useState, useEffect } from "react"
import SearchBar from "../../components/SearchBar"
import Tracks from "../../components/Tracks"
import Link from "../../components/Link"
import getReturnedParams from "../../utils/getReturnedParams"
import getSpotifyAuthUrl from "../../utils/getSpotifyAuthUrl"
import fetchFromSpotifyApi from "../../utils/fetchFromSpotifyApi"
import data from "../../data/sample"

const SearchTrack = () => {
  const spotifyAuthUrl = getSpotifyAuthUrl()

  const [isLoading, setIsLoading] = useState(false)
  const [authInfo, setAuthInfo] = useState({ isAuth: false })
  const [tracks, setTracks] = useState(data)
  const [selectedTracks, setSelectedTracks] = useState([])

  const handleSearch = async query => {
    const SEARCH_API_ENDPOINT = `https://api.spotify.com/v1/search`
    const SEARCH_TYPE = `track`
    const URL = `${SEARCH_API_ENDPOINT}?q=${query}&type=${SEARCH_TYPE}`

    setIsLoading(true)
    const result = await fetchFromSpotifyApi(URL, authInfo.access_token)
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

  useEffect(() => {
    if (window.location.hash) {
      const newAuthInfo = {
        isAuth: true,
        ...getReturnedParams(window.location.hash),
      }
      setAuthInfo(newAuthInfo)
    }
  }, [])

  return authInfo.isAuth ? (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Tracks
          handleSelect={handleSelect}
          selectedTracks={selectedTracks}
          tracks={tracks}
        />
      )}
    </div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <p>
        Before using the app, pwease login to Spotify{" "}
        <Link to={spotifyAuthUrl}>
          <span style={{ color: "white" }}>here</span>
        </Link>
        .
      </p>
    </div>
  )
}

export default SearchTrack
