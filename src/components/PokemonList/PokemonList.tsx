import React, {
  useEffect,
  useState,
  FC,
  ChangeEvent,
  SetStateAction,
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AllPokemonsList from '../AllPokemonsList/AllPokemonsList'
import AllPokemonsByType from '../AllPokemonsByType/AllPokemonsByType'
import {fetchPokemonTypes} from '../../redux/actions'
import {getPokemonTypes} from '../../selectors/selectors'

import {
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import './PokemonList.sass'

const PokemonList: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const pokemonTypes = useSelector(getPokemonTypes)

  const [nameInput, setNameInput] = useState<string>('')
  const [typeSelect, setTypeSelect] = useState<string>('all')

  useEffect(() => {
    dispatch(fetchPokemonTypes() as never)
  }, [dispatch])

  const handleRedirectWithIdOrName = () => {
    if (nameInput !== '') {
      navigate(`/pokemon/${nameInput}`)
    }
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleChangeType = (
    event: SelectChangeEvent<SetStateAction<string>>
  ) => {
    setTypeSelect(event.target.value)
  }

  return (
    <div className='pokemon-list_container'>
      <h2 className='pokemon-list_container-header'>Pokemon List</h2>
      <div className='pokemon-list_container_search'>
        <TextField
          className='pokemon-list_container_search_input'
          label='Find by name or id'
          value={nameInput}
          onChange={handleChangeName}
        />
        <Button
          className='pokemon-list_container_search_button'
          onClick={handleRedirectWithIdOrName}
          variant='outlined'
        >
          Find pokemon
        </Button>
      </div>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        className='pokemon-list_container_select'
        value={typeSelect}
        onChange={handleChangeType}
      >
        <MenuItem value='all'>all</MenuItem>
        {pokemonTypes.map((el) => (
          <MenuItem key={el.name} value={el.name}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
      {typeSelect === 'all' ? (
        <AllPokemonsList />
      ) : (
        <AllPokemonsByType type={typeSelect} />
      )}
    </div>
  )
}

export default PokemonList
