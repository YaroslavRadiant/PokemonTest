import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'
import {RootState} from './store'
import {
  getPokemonList,
  getPokemonDetails,
  getPokemonTypes,
  getPokemonsByType,
} from '../api/api'

export const FETCH_POKEMON_LIST_REQUEST = 'FETCH_POKEMON_LIST_REQUEST'
export const FETCH_POKEMON_LIST_SUCCESS = 'FETCH_POKEMON_LIST_SUCCESS'
export const FETCH_POKEMON_LIST_FAILURE = 'FETCH_POKEMON_LIST_FAILURE'

export const FETCH_POKEMON_DETAILS_REQUEST = 'FETCH_POKEMON_DETAILS_REQUEST'
export const FETCH_POKEMON_DETAILS_SUCCESS = 'FETCH_POKEMON_DETAILS_SUCCESS'
export const FETCH_POKEMON_DETAILS_FAILURE = 'FETCH_POKEMON_DETAILS_FAILURE'

export const FETCH_POKEMON_TYPES_REQUEST = 'FETCH_POKEMON_TYPES_REQUEST'
export const FETCH_POKEMON_TYPES_SUCCESS = 'FETCH_POKEMON_TYPES_SUCCESS'
export const FETCH_POKEMON_TYPES_FAILURE = 'FETCH_POKEMON_TYPES_FAILURE'

export const FETCH_POKEMONS_BY_TYPE_REQUEST = 'FETCH_POKEMONS_BY_TYPE_REQUEST'
export const FETCH_POKEMONS_BY_TYPE_SUCCESS = 'FETCH_POKEMONS_BY_TYPE_SUCCESS'
export const FETCH_POKEMONS_BY_TYPE_FAILURE = 'FETCH_POKEMONS_BY_TYPE_FAILURE'
export const RESET_ERRORS = 'RESET_ERRORS'

type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>

export const fetchPokemonList =
  (
    page: number,
    limit: number
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({type: FETCH_POKEMON_LIST_REQUEST})

      const pokemonList = await getPokemonList(page, limit)

      dispatch({
        type: FETCH_POKEMON_LIST_SUCCESS,
        payload: pokemonList,
      })
    } catch (error: unknown) {
      dispatch({type: FETCH_POKEMON_LIST_FAILURE, payload: error})
    }
  }

export const fetchPokemonDetails =
  (
    idOrName: string
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({type: FETCH_POKEMON_DETAILS_REQUEST})

      const pokemonDetails = await getPokemonDetails(idOrName)

      dispatch({
        type: FETCH_POKEMON_DETAILS_SUCCESS,
        payload: pokemonDetails,
      })
    } catch (error: unknown) {
      dispatch({type: FETCH_POKEMON_DETAILS_FAILURE, payload: error})
    }
  }

export const fetchPokemonTypes =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({type: FETCH_POKEMON_TYPES_REQUEST})

      const pokemonTypes = await getPokemonTypes()

      dispatch({
        type: FETCH_POKEMON_TYPES_SUCCESS,
        payload: pokemonTypes,
      })
    } catch (error: unknown) {
      dispatch({type: FETCH_POKEMON_TYPES_FAILURE, payload: error})
    }
  }

export const fetchPokemonsByTypes =
  (type: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({type: FETCH_POKEMONS_BY_TYPE_REQUEST})

      const pokemonsByType = await getPokemonsByType(type)

      dispatch({
        type: FETCH_POKEMONS_BY_TYPE_SUCCESS,
        payload: pokemonsByType,
      })
    } catch (error: unknown) {
      dispatch({type: FETCH_POKEMONS_BY_TYPE_FAILURE, payload: error})
    }
  }

export const resetErrors =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: DispatchType): void => {
    dispatch({type: RESET_ERRORS})
  }
