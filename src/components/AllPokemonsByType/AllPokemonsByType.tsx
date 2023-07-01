import React, {useEffect, useState, FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPokemonsByTypes} from '../../redux/actions'
import {Loader} from '../../common/Loader/Loader'
import PokemonListItem from '../PokemonListItem/PokemonListItem'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import {getPokemonsByType, getLoadingSelector} from '../../selectors/selectors'
import {Pokemon} from '../../redux/types'

import {Pagination} from '@mui/material'

interface Props {
  type: string
}

interface ChunkItem {
  pokemon: Pokemon
}

const DEFAULT_ITEM_PER_PAGE = 20

const AllPokemonsByType: FC<Props> = ({type}) => {
  const dispatch = useDispatch()

  const pokemonsByType = useSelector(getPokemonsByType)
  const loading = useSelector(getLoadingSelector)

  const pokemonsByTypeFetched = pokemonsByType.find(
    (el: Pokemon) => type === el.name
  )

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (type !== 'all' && !pokemonsByTypeFetched)
      dispatch(fetchPokemonsByTypes(type) as never)
  }, [dispatch, pokemonsByTypeFetched, type])

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Loader />
  }

  const resultArray: ChunkItem[][] = []
  if (pokemonsByTypeFetched) {
    if (!pokemonsByTypeFetched.pokemon.length) {
      return <ErrorComponent type='type' />
    }
    for (
      let i = 0;
      i < pokemonsByTypeFetched?.pokemon.length;
      i += DEFAULT_ITEM_PER_PAGE
    ) {
      const chunk = pokemonsByTypeFetched?.pokemon.slice(
        i,
        i + DEFAULT_ITEM_PER_PAGE
      )
      resultArray.push(chunk)
    }
  }

  return (
    <>
      {pokemonsByTypeFetched?.pokemon ? (
        <>
          <ul className='all-pokemons-list_ul'>
            {resultArray[currentPage - 1].map((pokemon) => {
              const id = parseInt(
                pokemon.pokemon.url.split('/').filter(Boolean).pop() as string,
                10
              )
              return (
                <PokemonListItem key={id} id={id} name={pokemon.pokemon.name} />
              )
            })}
          </ul>
          <Pagination
            className='all-pokemons-list_pagination'
            count={Math.ceil(
              pokemonsByTypeFetched?.pokemon.length / DEFAULT_ITEM_PER_PAGE
            )}
            page={currentPage}
            onChange={handleChangePage}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default AllPokemonsByType
