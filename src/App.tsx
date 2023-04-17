import { useState, useEffect } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [shortByContry, setshortByContry] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleShortByCountry = () => {
    setshortByContry(prevState => !prevState)
  }

  const shortedUsers = shortByContry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleShortByCountry}>{shortByContry ? 'No ordenar por pais' : 'Ordenar por pais' }</button>
      </header>
      <UsersList showColors={showColors} users={shortedUsers} />
    </div>
  )
}

export default App
