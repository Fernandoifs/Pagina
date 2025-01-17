import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import Display from './pages/Display'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  )
}

export default App