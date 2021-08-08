import { Playlist, Track, Tracks, UserProfile } from '../types/spotify'

const BASE_URL: string = 'https://api.spotify.com/v1'

export const spotifyAuthUrl = (): string => {
  const options: string = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
    redirect_uri: 'http://localhost:3000/',
    response_type: 'token',
    scope: 'playlist-modify-private',
  }).toString()
  return `https://accounts.spotify.com/authorize?${options}`
}

export const authorize = (): void => {
  window.location.replace(spotifyAuthUrl())
}

export const getProfile = (accessToken: string): Promise<UserProfile> => {
  return fetch(`${BASE_URL}/me`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then(res => res.json())
}

export const getTracks = (
  accessToken: string,
  options: Record<string, string>
): Promise<{ tracks: Tracks }> => {
  const params: string = new URLSearchParams(options).toString()
  return fetch(`${BASE_URL}/search?${params}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then(res => res.json())
}

export const postPlaylist = (
  accessToken: string,
  userId: string,
  payload: Object
): Promise<Playlist> => {
  return fetch(`${BASE_URL}/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json())
}

export const postPlaylistTracks = (
  accessToken: string,
  playlistId: string,
  payload: Object
): Promise<{ snapshot_id: string }> => {
  return fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json())
}
