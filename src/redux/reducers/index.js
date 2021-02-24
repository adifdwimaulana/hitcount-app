import { combineReducers } from 'redux'
import reducer from '../../store/reducer'

import { fetchLogin } from './users/auth'
import { fetchUsers } from './users/list'
import { fetchDevice } from './devices/list'

const rootReducers = combineReducers({
    reducerStore: reducer,
    loginStore: fetchLogin,
    deviceStore: fetchDevice,
    userStore: fetchUsers,
})

export default rootReducers