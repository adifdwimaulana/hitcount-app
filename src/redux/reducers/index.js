import { combineReducers } from 'redux'
import reducer from '../../store/reducer'

import { fetchLogin } from './users/auth'

const rootReducers = combineReducers({
    reducerStore: reducer,
    loginStore: fetchLogin,
})

export default rootReducers