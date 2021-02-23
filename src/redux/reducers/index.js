import { combineReducers } from 'redux'
import reducer from '../../store/reducer'

import { fetchLogin } from './users/auth'
import { fetchDevice } from './devices/list'

const rootReducers = combineReducers({
    reducerStore: reducer,
    loginStore: fetchLogin,
    deviceStore: fetchDevice
})

export default rootReducers