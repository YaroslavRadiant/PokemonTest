import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import App from './App'
import PokemonDetailsWrapper from './components/PokemonDetails/PokemonDetailsWrapper'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/pokemon/:idOrName' element={<PokemonDetailsWrapper />} />
      </Routes>
    </Router>
  </Provider>
)
