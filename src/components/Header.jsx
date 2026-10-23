import { Link } from 'react-router-dom'
import './Header.css'

// Official logo hosted on Wikimedia Commons
const POKEMON_LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg'

// Frosted top bar. Anything passed as children goes on the right-hand side.
function Header({ children }) {
  return (
    <header className="site-header">
      <Link to="/" className="site-brand">
        <img src={POKEMON_LOGO} alt="Pokémon" className="site-logo" />
      </Link>
      {children}
    </header>
  )
}

export default Header
