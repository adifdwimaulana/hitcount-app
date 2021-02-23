import { FETCH_TASK, RECEIVE_TASK, RECEIVE_APPROVED_TASK, RECEIVE_REJECTED_TASK, FAILED_TASK } from '../../actions/tasks/list'

const defaultState = {
    activeTask: [],
    approvedTask: [],
    rejectedTask: [],
    activeTaskCount: 0,
    approvedTaskCount: 0,
    rejectedTaskCount: 0
}

export function fetchTask(state = defaultState, action){
    switch(action.type){
        case FETCH_TASK:
            return ({ activeTask: [], approvedTask: [], rejectedTask: [], activeTaskCount: 0, approvedTaskCount: 0, rejectedTaskCount: 0, inProgress: true })
        case RECEIVE_TASK:
            const active = action.payload.filter(x => x.status == 1)

            return Object.assign({}, state, { activeTask: active, activeTaskCount: active.length, inProgress: false })
        case RECEIVE_APPROVED_TASK:
            const approved = action.payload.filter(x => x.status == 2)

            return Object.assign({}, state, { approvedTask: approved, approvedTaskCount: approved.length, inProgress: false })
        case RECEIVE_REJECTED_TASK:
            const rejected = action.payload.filter(x => x.status == 3)

            return Object.assign({}, state, { rejectedTask: rejected, rejectedTaskCount: rejected.length, inProgress: false })
        case FAILED_TASK:
            return ({ activeTask: [], approvedTask: [], rejectedTask: [], activeTaskCount: 0, approvedTaskCount: 0, rejectedTaskCount: 0, inProgress: false })
        default:
            return state
    }
}