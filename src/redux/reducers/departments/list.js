import { FETCH_DEPARTMENT, RECEIVE_DEPARTMENT, RECEIVE_INACTIVE_DEPARTMENT, FAILED_DEPARTMENT } from '../../actions/departments/list'

const defaultState = {
    activeDepartment: [],
    inactiveDepartment: [],
    departments: [],
    activeDepartmentCount: 0,
    inactiveDepartmentCount: 0,
    departmentsCount: 0
}

export function fetchDepartment(state = defaultState, action){
    switch(action.type){
        case FETCH_DEPARTMENT:
            return ({ activeDepartment: [], inactiveDepartment: [], departments: [], activeDepartmentCount: 0, inactiveDepartmentCount: 0, departmentsCount: 0, inProgress: true })
        case RECEIVE_DEPARTMENT:
            const active = action.payload.filter(x => x.status == 1)

            return Object.assign({}, state, { activeDepartment: active, departments: action.payload, activeDepartmentCount: active.length, departmentsCount: action.payload.length, inProgress: false })
        case RECEIVE_INACTIVE_DEPARTMENT:
            const inactive = action.payload.filter(x => x.status == 2)

            return Object.assign({}, state, { inactiveDepartment: inactive, departments: action.payload, inactiveDepartmentCount: inactive.length, departmentsCount: action.payload.length, inProgress: false })
        case FAILED_DEPARTMENT:
            return ({ activeDepartment: [], inactiveDepartment: [], departments: [], activeDepartmentCount: 0, inactiveDepartmentCount: 0, departmentsCount: 0, inProgress: false })
        default:
            return state
    }
}