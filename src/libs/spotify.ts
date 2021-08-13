import { Playlist, Tracks, UserProfile } from 'types/spotify'
import axios, { AxiosResponse } from 'axios'

const send = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

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

export const getProfile = (accessToken: string): Promise<AxiosResponse<UserProfile>> => {
  return send.get(`/me`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}

export const getTracks = (accessToken: string, params: Object): Promise<AxiosResponse<Tracks>> => {
  return send.get('/search', {
    params,
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}

export const postPlaylist = (
  accessToken: string,
  userID: string,
  payload: Object
): Promise<AxiosResponse<Playlist>> => {
  return send.post(`/users/${userID}/playlists`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
}

export const postPlaylistTracks = (
  accessToken: string,
  id: string,
  payload: Object
): Promise<AxiosResponse<{ snapshot_id: string }>> => {
  return send.post(`/playlists/${id}/tracks`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
}
