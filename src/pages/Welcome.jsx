import { Link } from 'react-router-dom'
import './Welcome.css'

// Official logo hosted on Wikimedia Commons
const POKEMON_LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg'

function Welcome() {
  return (
    <div className="welcome">
      <header className="welcome-header">
        <Link to="/" className="welcome-brand">
          <img src={POKEMON_LOGO} alt="Pokémon" className="welcome-logo" />
        </Link>
        <Link to="/pokemon" className="icon-button" aria-label="Search Pokédex">
          <span className="material-symbols-outlined">search</span>
        </Link>
      </header>

      <main className="welcome-main">
        <section className="welcome-greeting">
          <span className="eyebrow">View Pokemons</span>
          <h1>Hello, Stranger Danger</h1>
          <p>Discover Pokémons or find it out yourself</p>
        </section>

        <section className="hub">
          <Link to="/pokemon" className="hub-card hub-card--primary">
            <div className="hub-card-top">
              <span className="hub-icon">
                <span className="material-symbols-outlined">dataset</span>
              </span>
              <span className="material-symbols-outlined hub-arrow">arrow_forward</span>
            </div>
            <div>
              <h2>Pokédex</h2>
              <p>Explore different Pokemons </p>
            </div>
            <span className="hub-cta">
              Open Pokédex
              <span className="material-symbols-outlined">chevron_right</span>
            </span>
          </Link>

          <Link to="/fun" className="hub-card hub-card--secondary">
            <div className="hub-card-top">
              <span className="hub-icon">
                <span className="material-symbols-outlined">play_circle</span>
              </span>
              <span className="material-symbols-outlined hub-arrow">arrow_forward</span>
            </div>
            <div>
              <h2>Cat video</h2>
              <p>Just a cat video</p>
            </div>
            <span className="hub-cta">
              Watch Random Clip
              <span className="material-symbols-outlined">chevron_right</span>
            </span>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Welcome
