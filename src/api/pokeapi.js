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

// The Pokémon endpoint only gives each ability's name and a link, so we follow
// the link to get a short English description. A failed lookup just leaves it blank.
async function fetchAbilityDescription(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return ''
    const data = await res.json()
    const effect = data.effect_entries.find((e) => e.language.name === 'en')
    // Newer abilities sometimes only have flavour text
    const flavor = data.flavor_text_entries.findLast((e) => e.language.name === 'en')
    const text = effect?.short_effect ?? flavor?.flavor_text ?? ''
    return text.replace(/\s+/g, ' ').trim()
  } catch {
    return ''
  }
}

export async function fetchPokemonDetails(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(name.toLowerCase())}`)
  if (res.status === 404) throw new Error(`No Pokémon called “${name}”`)
  if (!res.ok) throw new Error(`Failed to load ${name} (HTTP ${res.status})`)

  const data = await res.json()
  const abilities = await Promise.all(
    data.abilities.map(async ({ ability, is_hidden }) => ({
      name: ability.name,
      hidden: is_hidden,
      description: await fetchAbilityDescription(ability.url),
    })),
  )

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other?.['official-artwork']?.front_default ?? getArtworkUrl(data.id),
    types: data.types.map((t) => t.type.name),
    height: data.height / 10, // decimetres -> metres
    weight: data.weight / 10, // hectograms -> kilograms
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    abilities,
  }
}
