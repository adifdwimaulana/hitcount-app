import { FETCH_USERS, RECEIVE_USERS } from '../../actions/users/list'

const defaultState = {
    users: []
}

export function fetchUsers(state = defaultState, action){
    switch(action.type){
        case FETCH_USERS:
            return ({ users: [], inProgress: true })
        case RECEIVE_USERS:
            return Object.assign({}, state, { users: action.payload, inProgress: false })
        default:
            return state
    }
}