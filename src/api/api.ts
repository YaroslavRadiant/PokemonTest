import axios from 'axios'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

interface RequestError extends Error {
  response?: {
    status: number
  }
}

export const getPokemonList = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: {
        offset: (page - 1) * limit,
        limit: limit,
      },
    })
    return response.data
  } catch (error) {
    const requestError: RequestError = new Error('Error fetching Pokemon list')
    throw requestError
  }
}

export const getPokemonDetails = async (idOrName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${idOrName}`)
    return response.data
  } catch (error) {
    const requestError: RequestError = new Error(
      'Error fetching Pokemon details'
    )
    if (requestError.response && requestError.response.status === 404) {
      throw new Error('Invalid Pokemon ID or Name')
    } else {
      throw requestError
    }
  }
}

export const getPokemonTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/type`)
    return response.data
  } catch (error) {
    const requestError: RequestError = new Error('Error fetching Pokemon types')
    if (axios.isAxiosError(error)) {
      requestError.response = error.response
    }
    throw requestError
  }
}

export const getPokemonsByType = async (type: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/type/${type}`)
    return response.data
  } catch (error) {
    const requestError: RequestError = new Error('Error fetching Pokemon types')
    throw requestError
  }
}
