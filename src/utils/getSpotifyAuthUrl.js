const getSpotifyAuthUrl = () => {
  const API_ENDPOINT = "https://accounts.spotify.com/authorize";
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private";
  return `${API_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};

export default getSpotifyAuthUrl;
