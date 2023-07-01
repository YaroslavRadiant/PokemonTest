import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {resetErrors} from '../../redux/actions'
import {Pikachu} from '../../assets/Pikachu'

import {Button} from '@mui/material'

interface Props {
  type: string
}
const ErrorComponent: FC<Props> = ({type}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNavigateToMainPage = () => {
    dispatch(resetErrors() as never)
    navigate(`/`)
  }

  return (
    <>
      {type !== 'type' ? (
        <h2>Invalid pokemon name</h2>
      ) : (
        <h2>There is no pokemons</h2>
      )}

      <Pikachu />
      {type !== 'type' && (
        <Button onClick={handleNavigateToMainPage}>
          Back to pokemons list
        </Button>
      )}
    </>
  )
}

export default ErrorComponent
