import React, {useEffect, FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchPokemonDetails, resetErrors} from '../../redux/actions'
import {Loader} from '../../common/Loader/Loader'
import PokemonStat from './PokemonStat/PokemonStat'
import {getPokemonDetails} from '../../selectors/selectors'

import {Button} from '@mui/material'
import './PokemonDetails.sass'

interface Props {
  idOrName: string
}
interface Move {
  move: {
    name: string
  }
}

const PokemonDetails: FC<Props> = ({idOrName}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pokemons = useSelector(getPokemonDetails)

  const pokemon = pokemons.find(
    (pokemon) =>
      +pokemon.id === +idOrName ||
      pokemon.name === idOrName.trim().toLowerCase()
  )
  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokemonDetails(idOrName.trim().toLowerCase()) as never)
    }
  }, [dispatch, idOrName, pokemon])

  const handleNavigateToMainPage = () => {
    dispatch(resetErrors() as never)
    navigate(`/`)
  }

  return (
    <>
      {pokemon ? (
        <div className='pokemon-container'>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
          />

          <div className='pokemon-container_all-info'>
            <h2>{pokemon.name}</h2>
            <div className='pokemon-container_stats'>
              <PokemonStat
                icon='octicon:heart-16'
                stat={pokemon.stats[0].base_stat}
              />
              <PokemonStat icon='mdi:sword' stat={pokemon.stats[1].base_stat} />
              <PokemonStat
                icon='material-symbols:shield'
                stat={pokemon.stats[2].base_stat}
              />

              <PokemonStat
                icon='ri:sword-fill'
                stat={pokemon.stats[3].base_stat}
              />
              <PokemonStat
                icon='zondicons:shield'
                stat={pokemon.stats[4].base_stat}
              />
              <PokemonStat
                icon='fluent:run-16-filled'
                stat={pokemon.stats[5].base_stat}
              />
            </div>
            <h3>Abilities:</h3>
            <div className='pokemon-container_all-info_moves'>
              {pokemon.moves.map((move: Move) => (
                <span key={move.move.name}>{move.move.name} </span>
              ))}
            </div>
            <Button
              className='pokemon-container_all-info_back'
              onClick={handleNavigateToMainPage}
            >
              Back to pokemons list
            </Button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PokemonDetails
