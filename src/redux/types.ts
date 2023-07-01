interface PokemonList {
  results: Pokemon[]
}

interface Sprite {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other: {
    dream_world: {front_default: string; front_female: string | null}
    home: {front_default: string; front_female: string | null}
    'official-artwork': {front_default: string; front_female: string | null}
  }
  versions: {
    [generation: string]: {[version: string]: {front_default: string}}
  }
}

interface Stat {
  base_stat: number
  effort: number
  stat: {name: string; url: string}
}

interface PokemonDetails {
  id: number
  moves: {move: Move}[]
  name: string
  order: number
  species: {name: string; url: string}
  sprites: Sprite
  stats: Stat[]
  types: {type: {name: string; url: string}}[]
}

interface PokemonByType {
  pokemon: Pokemon[]
}

export interface Move {
  name: string
  url: string
}

export interface Pokemon {
  url: string
  name: string
}

export interface PokemonState {
  pokemonList: PokemonList[]
  pokemonDetails: PokemonDetails[]
  pokemonTypes: Pokemon[]
  pokemonsByType: PokemonByType[]
  loading: boolean
  error: unknown
}
