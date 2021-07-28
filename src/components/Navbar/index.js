import { useState } from 'react'
import Link from '../Link'
import Button from '../Button'
import style from './style.module.css'
import { FaSpotify } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { authorize } from '../../libs/spotify'
import { useSelector } from 'react-redux'

const Navbar = props => {
  const [query, setQuery] = useState('')
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()
    query ? props.handleSearch(query) : alert('Pwease input the query')
  }

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>
        <Link to='/' >GenGIGIH</Link>
      </div>
      <form className={style.search} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search..."
          onChange={handleChange}
          value={query}
        />
        <Button onClick={handleSearch} variant='transparent' >
          <FiSearch size="1.25em" style={{ margin: 0 }} />
        </Button>
      </form>
      <div className={style.user}>
        {isAuthenticated ? (
          'Hello, ' + user.display_name
        ) : (
          <Button onClick={authorize} icon={<FaSpotify />}>
            Login to Spotify
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
