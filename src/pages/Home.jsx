import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './Home.css'

function Home() {
  return (
    <div className="welcome">
      <Header>
        <Link to="/pokemon" className="icon-button" aria-label="Search Pokédex">
          <span className="material-symbols-outlined" aria-hidden="true">search</span>
        </Link>
      </Header>

      <main className="welcome-main">
        <section className="welcome-greeting">
          <span className="eyebrow">View Pokemons</span>
          <h1>Hello, Stranger Danger</h1>
          <p>Discover Pokémons or find it out yourself</p>
        </section>

        <section className="hub">
          <Link to="/pokemon" className="hub-card">
            <div className="hub-card-top">
              <span className="hub-icon">
                <span className="material-symbols-outlined" aria-hidden="true">dataset</span>
              </span>
              <span className="material-symbols-outlined hub-arrow" aria-hidden="true">arrow_forward</span>
            </div>
            <div>
              <h2>Pokédex</h2>
              <p>Explore different Pokemons </p>
            </div>
            <span className="hub-cta">
              Open Pokédex
              <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </span>
          </Link>

        </section>
      </main>
    </div>
  )
}

export default Home
