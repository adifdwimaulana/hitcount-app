import { combineReducers } from 'redux'
import reducer from '../../store/reducer'

import { fetchLogin } from './users/auth'
import { fetchTask } from './tasks/list'
import { fetchDepartment } from './departments/list'

const rootReducers = combineReducers({
    reducerStore: reducer,
    loginStore: fetchLogin,
    taskStore: fetchTask,
    departmentStore: fetchDepartment,
})

export default rootReducers