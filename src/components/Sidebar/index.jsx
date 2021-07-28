import Button from '../Button'

const Sidebar = props => {
  return (
    <aside>
      <ul>
        <li>
          <Button
            onClick={() => openModal('create-playlist')}
            variant="transparent"
          >
            Create playlist
          </Button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
