import { useState } from "react"
import Track from "./Track"

const Tracks = ({ tracks, handleSelect, selectedTracks }) => {
  return (
    <div>
      <h1>Tracks</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tracks &&
          tracks.map(track => (
            <Track
              handleSelect={handleSelect}
              isSelected={selectedTracks.includes(track.uri)}
              track={track}
              key={track.id}
            />
          ))}
      </ul>
    </div>
  )
}

export default Tracks
