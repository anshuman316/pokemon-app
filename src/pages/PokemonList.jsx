import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchPokemonList } from '../api/pokeapi'
import Header from '../components/Header'
import PokemonCard from '../components/PokemonCard'
import './PokemonList.css'

const PAGE_SIZE = 20

function PokemonList() {
  // The page lives in the URL (?page=3) so going Back from a details page lands on the same page
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(0, (parseInt(searchParams.get('page'), 10) || 1) - 1)

  const [search, setSearch] = useState('')
  const [attempt, setAttempt] = useState(0)
  // The last response we got, tagged with the request it answers. If the tag doesn't
  // match the current request, that one is still loading.
  const [result, setResult] = useState(null)
  const requestKey = `${page}:${attempt}`

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another page
    let ignore = false

    fetchPokemonList(PAGE_SIZE, page * PAGE_SIZE)
      .then((data) => {
        if (!ignore) setResult({ key: requestKey, ...data })
      })
      .catch((err) => {
        if (!ignore) setResult({ key: requestKey, error: err.message })
      })

    return () => {
      ignore = true
    }
  }, [page, requestKey])

  const loading = result?.key !== requestKey
  const error = !loading && result.error

  function goToPage(newPage) {
    setSearchParams(newPage === 0 ? {} : { page: String(newPage + 1) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil((result?.total ?? 0) / PAGE_SIZE)
  const query = search.trim().toLowerCase()
  const filtered = (result?.pokemon ?? []).filter((p) => p.name.includes(query))

  return (
    <div className="pokedex-page">
      <Header>
        <Link to="/" className="icon-button" aria-label="Home">
          <span className="material-symbols-outlined" aria-hidden="true">home</span>
        </Link>
      </Header>

      <main className="pokedex">
        <header className="pokedex-header">
          <h1>Pokédex</h1>
          <p>Browse Pokémon and tap one to see its abilities.</p>
          <input
            type="search"
            className="search"
            placeholder="Search this page…"
            aria-label="Search Pokémon on this page"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {loading && <p className="status">Loading Pokémon…</p>}

        {error && (
          <div className="status error">
            <p>⚠️ {error}</p>
            <button className="button" onClick={() => setAttempt((a) => a + 1)}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <p className="status">
                {query ? `No Pokémon on this page match “${search}”.` : 'No Pokémon on this page.'}
              </p>
            ) : (
              <div className="grid">
                {filtered.map((p) => (
                  <PokemonCard key={p.id} {...p} />
                ))}
              </div>
            )}

            <nav className="pagination" aria-label="Pokédex pages">
              <button className="button" onClick={() => goToPage(page - 1)} disabled={page === 0}>
                ← Previous
              </button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <button
                className="button"
                onClick={() => goToPage(page + 1)}
                disabled={page + 1 >= totalPages}
              >
                Next →
              </button>
            </nav>
          </>
        )}
      </main>
    </div>
  )
}

export default PokemonList
