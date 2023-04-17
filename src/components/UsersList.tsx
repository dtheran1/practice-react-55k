import { type User } from '../types'

interface Props {
  users: User[]
  showColors: boolean
}

export function UsersList ({ users, showColors }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {
          users.map((user, index) => {
            const backgroudColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroudColor : 'transparent'

            return (
              <tr key={index} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Borrar</button>
                </td>

              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
