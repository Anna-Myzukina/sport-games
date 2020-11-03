import React, { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import Games from './components/Games'
import axios from 'axios'

function App() {
  const [games, setGames] = useState([])
  const [currentPages, setCurrentPages] = useState(1)
  const [gamesPerPage] = useState(20)


  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get('http://localhost:3000/games')
      setGames(res.data)
    }

    fetchGames()
  }, [])

  const indexOfLastGame = currentPages * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
  

  console.log(games)
  return (
    <div className="App">
<h1>Sport Games</h1>


<Games games={currentGames}/>
<Pagination setCurrentPages={setCurrentPages}/>
    </div>
  );
}

export default App;
