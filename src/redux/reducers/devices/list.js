import { FETCH_DEVICE, RECEIVE_DEVICE, FETCH_DEVICE_DETAIL, RECEIVE_DEVICE_DETAIL } from '../../actions/devices/list'

const defaultState = {
    data: [],
    inProgress: false
}

export function fetchDevice(state = defaultState, action){
    switch(action.type){
        case FETCH_DEVICE:
            return ({ dataDevice: [], inProgress: true })
        case RECEIVE_DEVICE:
            return Object.assign({}, state, { dataDevice: action.payload, inProgress: false })
        case FETCH_DEVICE_DETAIL:
            return ({ deviceDetail: [], inProgress: true })
        case RECEIVE_DEVICE_DETAIL:
            return Object.assign({}, state, { deviceDetail: action.payload, inProgress: false })
        default:
            return state
    }
}