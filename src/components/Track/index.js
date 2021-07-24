import Link from '../Link'
import style from './style.module.css'

const Track = ({ track, handleSelect, isSelected }) => {
  const artists = track.artists.map((artist, index) => {
    const isLast = index === track.artists.length - 1
    return (
      <Link to={artist.external_urls.spotify} key={artist.id}>
        {artist.name + (isLast ? '' : ', ')}
      </Link>
    )
  })

  const image = track.album.images.find(image => image.width === 64)

  return (
    <div className={style.wrapper}>
      <img className={style.image} src={image.url} />
      <span className={style.info}>
        <a className={style.title}>{track.name}</a>
        <p className={style.artist}>{artists}</p>
      </span>
      <span className={style.action}>
        <button onClick={() => handleSelect(track.uri)}>
          {isSelected ? 'Deselect' : 'Select'}
        </button>
      </span>
    </div>
  )
}

export default Track