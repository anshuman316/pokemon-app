import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchPokemonDetails } from '../api/pokeapi'
import Header from '../components/Header'
import './PokemonDetails.css'

// pikachu - pickachu
const MAX_STAT = 255

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

function formatName(name) {
  return name.replace(/-/g, ' ')
}

function PokemonDetails() {
  const { name } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null)
  const requestKey = `${name}:${attempt}`

  useEffect(() => {
    let ignore = false

    fetchPokemonDetails(name)
      .then((pokemon) => {
        if (!ignore) setResult({ key: requestKey, pokemon })
      })
      .catch((err) => {
        if (!ignore) setResult({ key: requestKey, error: err.message })
      })

    return () => {
      ignore = true
    }
  }, [name, requestKey])

  const loading = result?.key !== requestKey
  const error = !loading && result.error
  const pokemon = !loading && result.pokemon

  function goBack() {
    if (location.key === 'default') navigate('/pokemon')
    else navigate(-1)
  }

  return (
    <div className="details-page">
      <Header />

      <main className="details-main">
        <button className="back-link" onClick={goBack}>
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Back to Pokédex
        </button>

        {loading && <p className="status">Loading {formatName(name)}…</p>}

        {error && (
          <div className="status error">
            <p>⚠️ {error}</p>
            <button className="button" onClick={() => setAttempt((a) => a + 1)}>
              Try again
            </button>{' '}
            <Link to="/pokemon" className="button">
              All Pokémon
            </Link>
          </div>
        )}

        {pokemon && (
          <article className="details">
            <section className="details-hero">
              <img src={pokemon.image} alt={pokemon.name} className="details-img" />
              <div>
                <span className="details-id">#{String(pokemon.id).padStart(4, '0')}</span>
                <h1 className="details-name">{formatName(pokemon.name)}</h1>
                <ul className="types" aria-label="Types">
                  {pokemon.types.map((type) => (
                    <li key={type} className={`type type--${type}`}>
                      {type}
                    </li>
                  ))}
                </ul>
                <dl className="measures">
                  <div>
                    <dt>Height</dt>
                    <dd>{pokemon.height} m</dd>
                  </div>
                  <div>
                    <dt>Weight</dt>
                    <dd>{pokemon.weight} kg</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="panel">
              <h2>Abilities</h2>
              <ul className="abilities">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.name} className="ability">
                    <h3>
                      {formatName(ability.name)}
                      {ability.hidden && <span className="badge">Hidden</span>}
                    </h3>
                    {ability.description && <p>{ability.description}</p>}
                  </li>
                ))}
              </ul>
            </section>

            <section className="panel">
              <h2>Base stats</h2>
              <dl className="stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="stat">
                    <dt>{STAT_LABELS[stat.name] ?? formatName(stat.name)}</dt>
                    <dd>
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-bar" aria-hidden="true">
                        <span style={{ width: `${(stat.value / MAX_STAT) * 100}%` }} />
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        )}
      </main>
    </div>
  )
}

export default PokemonDetails
