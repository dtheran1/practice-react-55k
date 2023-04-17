import { useState, useEffect, useRef } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [shortByContry, setshortByContry] = useState(false)
  const originalUsers = useRef<User[]>([]) // Este hook se utiliza para almacenar valores que persisten a través de un renderizado y no causan una actualización del componente.

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleShortByCountry = () => {
    setshortByContry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user, userIndex) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

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
        <button onClick={handleReset}>
          Resetear estado
        </button>
      </header>
      <UsersList showColors={showColors} users={shortedUsers} deleteUser={handleDelete} />
    </div>
  )
}

export default App
