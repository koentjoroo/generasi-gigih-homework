import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import Tracks from '../../components/Tracks'
import Link from '../../components/Link'
import getReturnedParams from '../../utils/getReturnedParams'
import getSpotifyAuthUrl from '../../utils/getSpotifyAuthUrl'
import data from '../../data/sample'

const SearchTrack = props => {
    const spotifyAuthUrl = getSpotifyAuthUrl()

    const [authInfo, setAuthInfo] = useState({isAuth: false})
    const [tracks, setTracks] = useState(data)

    const handleSearch = async query => {
        const SEARCH_API_ENDPOINT = `https://api.spotify.com/v1/search`
        const SEARCH_TYPE = `track`
        const res = await fetch(`${SEARCH_API_ENDPOINT}?q=${query}&type=${SEARCH_TYPE}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authInfo.access_token
            }
        }).then(res => res.json())
        setTracks(res.tracks.items)
    }

    useEffect(() => {
        if (window.location.hash) {
            const newAuthInfo = {isAuth: true, ...getReturnedParams(window.location.hash)}
            setAuthInfo(newAuthInfo)
        }
    }, [])

    return authInfo.isAuth ? (
        <div>
            <SearchBar handleSearch={handleSearch} />
            <Tracks tracks={tracks} />
        </div>
    ) : (
        <div style={{ textAlign: 'center' }}>
            <p>Before using the app, pwease login to Spotify <Link to={spotifyAuthUrl}><span style={{ color: 'white' }}>here</span></Link>.</p>
        </div>
    )
}

export default SearchTrack