import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokeapi'
import PokemonCard from '../components/PokemonCard'
import './PokemonList.css'

const PAGE_SIZE = 20

function PokemonList() {
  const [pokemon, setPokemon] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another page
    let ignore = false

    fetchPokemonList(PAGE_SIZE, page * PAGE_SIZE)
      .then((data) => {
        if (ignore) return
        setPokemon(data.pokemon)
        setTotal(data.total)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [page])

  function goToPage(newPage) {
    setLoading(true)
    setError(null)
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const filtered = pokemon.filter((p) =>
    p.name.includes(search.trim().toLowerCase()),
  )

  return (
    <main className="home">
      <header className="home-header">
        <h1>Pokédex</h1>
        <p>Browse Pokémon and tap one to see its abilities.</p>
        <input
          type="search"
          className="search"
          placeholder="Search this page…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {error && <p className="status error">⚠️ {error}</p>}
      {loading && <p className="status">Loading Pokémon…</p>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="status">No Pokémon on this page match “{search}”.</p>
          ) : (
            <section className="grid">
              {filtered.map((p) => (
                <PokemonCard key={p.id} {...p} />
              ))}
            </section>
          )}

          <nav className="pagination">
            <button onClick={() => goToPage(page - 1)} disabled={page === 0}>
              ← Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page + 1 >= totalPages}
            >
              Next →
            </button>
          </nav>
        </>
      )}
    </main>
  )
}

export default PokemonList
