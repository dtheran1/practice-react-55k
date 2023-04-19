import { SortBy, type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
  changeSorting: (sort: SortBy) => void
}

export function UsersList ({ changeSorting, deleteUser, users, showColors }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? 'table--showColors' : ''}>
        {
          users.map((user) => {
            return (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteUser(user.email) }}>Borrar</button>
                </td>

              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
