import React, {FC} from 'react'
import {Icon} from '@iconify/react'

interface Props {
  icon: string
  stat: number
}

const PokemonStat: FC<Props> = ({icon, stat}) => {
  return (
    <div>
      <Icon className='stat-icon' icon={icon} />
      <p className='stat-text'>{stat}</p>
    </div>
  )
}

export default PokemonStat
