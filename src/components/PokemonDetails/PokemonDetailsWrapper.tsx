import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import PokemonDetails from './PokemonDetails'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import {getError, getPokemonDetails} from '../../selectors/selectors'

const PokemonDetailsWrapper: FC = () => {
  const error = useSelector(getError)
  const pokemons = useSelector(getPokemonDetails)

  const {idOrName} = useParams()

  if (error || !pokemons) {
    return <ErrorComponent type={'details'} />
  }
  return <PokemonDetails idOrName={idOrName as string} />
}

export default PokemonDetailsWrapper
