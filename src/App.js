import React, { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import Games from './components/Games'
import axios from 'axios'

function App() {
  const [games, setGames] = useState([])
  const [currentPages, setCurrentPages] = useState(1)
  const [gamesPerPage] = useState(10)


  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get('http://localhost:3000/games')
      setGames(res.data)
    }

    fetchGames()
    console.log(games)
  }, [])

  //to get current games we need:
  const indexOfLastGame = currentPages * gamesPerPage // index of last game on the ferst page will be 1 * 20 = 20; 2 * 20 = 40...
  const indexOfFirstGame = indexOfLastGame - gamesPerPage // 20 - 20 = 0; 40 - 20 = 20...
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame) // [0, 20]; [20, 40]...
  

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
