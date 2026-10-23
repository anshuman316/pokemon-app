import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PokemonList from './pages/PokemonList'
import PokemonDetails from './pages/PokemonDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
      <Route path="*" element={<p style={{ padding: '2rem' }}>Page not found. <Link to="/">Back home</Link></p>} />
    </Routes>
  )
}

export default App
