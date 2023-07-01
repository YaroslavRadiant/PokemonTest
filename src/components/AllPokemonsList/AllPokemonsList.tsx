import React, {useState, useEffect, memo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPokemonList} from '../../redux/actions'
import {Loader} from '../../common/Loader/Loader'
import {getLoadingSelector, getPokemonList} from '../../selectors/selectors'
import PokemonListItem from '../PokemonListItem/PokemonListItem'

import Pagination from '@mui/material/Pagination'
import './AllPokemonsList.sass'

const DEFAULT_ITEM_PER_PAGE = 20

const AllPokemonsList = memo(() => {
  const pokemonList = useSelector(getPokemonList)
  const loading = useSelector(getLoadingSelector)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchPokemonList(currentPage, 20) as never)
  }, [dispatch, currentPage])

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {pokemonList.results ? (
        <>
          <ul className='all-pokemons-list_ul'>
            {pokemonList.results.map((pokemon: {url: string; name: string}) => {
              const id = parseInt(
                pokemon.url.split('/').filter(Boolean).pop() as string,
                10
              )
              return <PokemonListItem key={id} id={id} name={pokemon.name} />
            })}
          </ul>
          <Pagination
            className='all-pokemons-list_pagination'
            count={Math.ceil(pokemonList.count / DEFAULT_ITEM_PER_PAGE)}
            page={currentPage}
            onChange={handleChangePage}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
})

AllPokemonsList.displayName = 'MyComponent';

export default AllPokemonsList
