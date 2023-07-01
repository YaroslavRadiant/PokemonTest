import React, {FC} from 'react'
import {Link} from 'react-router-dom'

interface Props {
  id: number
  name: string
}

const PokemonListItem: FC<Props> = ({id, name}) => {
  return (
    <>
      <Link to={`/pokemon/${id}`} className='list_container-link'>
        <li className='pokemon-list_container_item'>{name}</li>
      </Link>
    </>
  )
}

export default PokemonListItem
