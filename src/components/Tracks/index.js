import { useState } from "react"
import Track from "./Track"

const Tracks = ({ tracks }) => {
  const [selectedTracks, setSelectedTracks] = useState([])

  const handleSelect = uri => {
    const newSelectedTracks = selectedTracks
    if (newSelectedTracks.includes(uri)) {
      newSelectedTracks.splice(0, 1, uri)
    } else {
      newSelectedTracks.push(uri)
    }
    setSelectedTracks(newSelectedTracks)
  }

  return (
    <div>
      <h1>Tracks</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tracks &&
          tracks.map(track => (
            <Track
              handleSelect={handleSelect}
              isSelected={selectedTracks.includes(track.uri) ? true : false}
              track={track}
              key={track.id}
            />
          ))}
      </ul>
    </div>
  )
}

export default Tracks
