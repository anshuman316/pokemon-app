import { Link } from 'react-router-dom'
import './PokemonCard.css'

function PokemonCard({ id, name, image }) {
  return (
    <Link to={`/pokemon/${name}`} className="card">
      <span className="card-id">#{String(id).padStart(4, '0')}</span>
      <img src={image} alt={name} loading="lazy" className="card-img" />
      <h2 className="card-name">{name.replace(/-/g, ' ')}</h2>
    </Link>
  )
}

export default PokemonCard
