import {useState, useEffect} from 'react'
import Link from "../../Link";
import style from "./style.module.css";


const Track = props => {
  const {track, handleSelect} = props
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    handleSelect(track.uri)
    setIsSelected(!isSelected)
  }

  useEffect(() => props.isSelected && setIsSelected(true), [])

  const artists = track.artists.map((artist, index) => {
      const isLast = index === track.artists.length - 1;
      return (
        <Link to={artist.external_urls.spotify} key={artist.id}>
          {isLast ? artist.name : `${artist.name}, `}
        </Link>
      );
    });

    const image = track.album.images.find(image => image.width === 64)

    return (
    <li className={style.wrapper}>
      <img className={style.image} src={image.url} />
      <div className={style.info}>
        <a className={style.title}>
          {track.name}
        </a>
        <p className={style.artist}>{artists}</p>
      </div>
      <div className={style.action}>
        <Link to={track.external_urls.spotify} isExternal>Play on Spotify</Link>
        <button onClick={handleClick} >{ isSelected ? 'Deselect' : 'Select' }</button>
      </div>
    </li>
  );
};

export default Track;
