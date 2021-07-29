import { useSelector } from 'react-redux'
import Track from '../components/Track'
import PlaylistForm from '../components/PlaylistForm'

const CreatePlaylist = () => {
  const { tracks } = useSelector(state => state.playlist)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <h2>Tracks</h2>
        {tracks.map(track => (
          <Track track={track} key={track.id} />
        ))}
      </div>
      <PlaylistForm />
    </div>
  )
}

export default CreatePlaylist
