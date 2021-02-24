import { FETCH_USERS, RECEIVE_USERS } from '../../actions/users/list'

const defaultState = {
    users: []
}

export function fetchUsers(state = defaultState, action){
    switch(action.type){
        case FETCH_USERS:
            return ({ users: [], inProgress: true })
        case RECEIVE_USERS:
            var results = action.payload
            var i = 1
            var userOptions = []
            var admin = 0
            var user = 0
            results.forEach((result) => result['no'] = i++)

            results.forEach((result, index) => {
                userOptions.push({
                    label: result.email,
                    value: result.email
                })
                if(result.admin == true){
                    admin++
                } else if(result.admin == false){
                    user++
                }
            })

            return Object.assign({}, state, { users: results, userOptions, adminCount: admin, userCount: user, inProgress: false })
        default:
            return state
    }
}