import { Routes, Route, Link } from 'react-router-dom'
import Welcome from './pages/Welcome'
import PokemonList from './pages/PokemonList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/pokemon" element={<PokemonList />} />
      {/* Placeholders until we build these pages */}
      <Route
        path="/pokemon/:name"
        element={<p style={{ padding: '2rem' }}>Details page coming soon. <Link to="/">Back home</Link></p>}
      />
      <Route
        path="/fun"
        element={<p style={{ padding: '2rem' }}>Funny clips coming soon. <Link to="/">Back home</Link></p>}
      />
      <Route path="*" element={<p style={{ padding: '2rem' }}>Page not found. <Link to="/">Back home</Link></p>} />
    </Routes>
  )
}

export default App
