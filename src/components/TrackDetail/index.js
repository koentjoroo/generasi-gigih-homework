import Link from "../Link";
import './TrackDetail.css'

export default function TrackDetail({ data }) {
  const {
    album: { images, name: albumName, external_urls: albumExternalUrls },
    external_urls,
    artists,
    name,
  } = data;
  const image = images.find((image) => image.width === 300);

  const handleSelect = () => alert("Button clicked woowie");

  return (
    <div className="Track-wrapper">
      <div className="Track-image">
        <Link to={albumExternalUrls.spotify} isExternal>
          <img src={image.url} alt={albumName} />
        </Link>
      </div>
      <div className="Track-details">
        <Link to={external_urls.spotify} isExternal>
          <h2 className="Track-title">{name}</h2>
        </Link>
        <h3 className="Track-artists-name" >
          {artists.map(({ external_urls, name, id }, index) => {
            const isLast = index === artists.length - 1;
            return (
              <Link to={external_urls.spotify} key={id} isExternal>
                {isLast ? name : `${name}, `}
              </Link>
            );
          })}
        </h3>
        <Link to={albumExternalUrls.spotify} isExternal>
          <h4 className="Track-album-name" >{albumName}</h4>
        </Link>
        <button className="Track-button-primary" onClick={handleSelect}>Select</button>
      </div>
    </div>
  );
}
