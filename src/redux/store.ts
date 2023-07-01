import {createStore, applyMiddleware, Action} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {pokemonReducer} from './reducers'

export type RootState = ReturnType<typeof pokemonReducer>

const middleware: ThunkMiddleware<RootState, Action<string>>[] = [thunk]

const store = createStore(pokemonReducer, applyMiddleware(...middleware))

export default store
