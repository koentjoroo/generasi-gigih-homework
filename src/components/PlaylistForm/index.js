import style from './style.module.css'
import Button from '../Button'

const PlaylistForm = ({
  form,
  handleSubmit,
  handleFormChanges,
  clearSelection,
}) => {
  return (
    <div className={style.wrapper}>
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          minLength="10"
          onChange={handleFormChanges}
          value={form.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          minLength="20"
          onChange={handleFormChanges}
          value={form.description}
        ></textarea>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={clearSelection} type="button" variant="transparent">
            Clear
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </form>
    </div>
  )
}

export default PlaylistForm
