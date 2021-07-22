const fetchFromSpotifyApi = (URL, TOKEN) => {
  return fetch(URL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  }).then(res => res.json())
}

export default fetchFromSpotifyApi
