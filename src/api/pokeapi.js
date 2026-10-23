const BASE_URL = 'https://pokeapi.co/api/v2'
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

// The list endpoint only returns { name, url }, so we pull the ID out of the url
// ("https://pokeapi.co/api/v2/pokemon/25/" -> 25) to build the image link ourselves.
function getIdFromUrl(url) {
  return Number(url.split('/').filter(Boolean).pop())
}

export function getArtworkUrl(id) {
  return `${ARTWORK_URL}/${id}.png`
}

export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error(`Failed to load Pokémon (HTTP ${res.status})`)

  const data = await res.json()
  return {
    total: data.count,
    pokemon: data.results.map((p) => {
      const id = getIdFromUrl(p.url)
      return { id, name: p.name, image: getArtworkUrl(id) }
    }),
  }
}
