import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [shortByContry, setshortByContry] = useState(false)
  const originalUsers = useRef<User[]>([]) // Este hook se utiliza para almacenar valores que persisten a través de un renderizado y no causan una actualización del componente.
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
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

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return shortByContry
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [filteredUsers, shortByContry])

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleShortByCountry}>{shortByContry ? 'No ordenar por pais' : 'Ordenar por pais' }</button>
        <button onClick={handleReset}>
          Resetear estado
        </button>
        <input type="text" placeholder='Filtra por pais' onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
      <UsersList showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
    </div>
  )
}

export default App
