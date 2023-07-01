import {RootState} from '../redux/store'

export const getPokemonsByType = (state: RootState) => state.pokemonsByType

export const getPokemonDetails = (state: RootState) => state.pokemonDetails
export const getLoadingSelector = (state: RootState) => state.loading
export const getPokemonTypes = (state: RootState) => state.pokemonTypes
export const getPokemonList = (state: RootState) => state.pokemonList

export const getError = (state: RootState) => state.error
