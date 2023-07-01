import {
  FETCH_POKEMON_LIST_REQUEST,
  FETCH_POKEMON_LIST_SUCCESS,
  FETCH_POKEMON_LIST_FAILURE,
  FETCH_POKEMON_DETAILS_REQUEST,
  FETCH_POKEMON_DETAILS_SUCCESS,
  FETCH_POKEMON_DETAILS_FAILURE,
  FETCH_POKEMON_TYPES_REQUEST,
  FETCH_POKEMON_TYPES_SUCCESS,
  FETCH_POKEMON_TYPES_FAILURE,
  FETCH_POKEMONS_BY_TYPE_REQUEST,
  FETCH_POKEMONS_BY_TYPE_SUCCESS,
  FETCH_POKEMONS_BY_TYPE_FAILURE,
  RESET_ERRORS,
} from './actions'
import {PokemonState} from './types'

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: [],
  pokemonTypes: [],
  pokemonsByType: [],
  loading: false,
  error: null,
}

export const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_POKEMONS_BY_TYPE_REQUEST:
    case FETCH_POKEMON_TYPES_REQUEST:
    case FETCH_POKEMON_LIST_REQUEST:
    case FETCH_POKEMON_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokemonList: action.payload,
        loading: false,
        error: null,
      }
    case FETCH_POKEMON_DETAILS_SUCCESS:
      return {
        ...state,
        pokemonDetails: [action.payload, ...state.pokemonDetails],
        loading: false,
        error: null,
      }
    case FETCH_POKEMON_TYPES_SUCCESS:
      return {
        ...state,
        pokemonTypes: [...action.payload.results],
        loading: false,
        error: null,
      }
    case FETCH_POKEMONS_BY_TYPE_SUCCESS:
      return {
        ...state,
        pokemonsByType: [...state.pokemonsByType, action.payload],
        loading: false,
        error: null,
      }
    case FETCH_POKEMON_TYPES_FAILURE:
    case FETCH_POKEMON_LIST_FAILURE:
    case FETCH_POKEMONS_BY_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      }
    case FETCH_POKEMON_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Invalid Pokemon ID or Name',
      }
    case RESET_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
