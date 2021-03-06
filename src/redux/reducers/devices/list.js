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
            var results = action.payload
            var i = 1
            results.forEach((result) => result['no'] = i++)

            return Object.assign({}, state, { dataDevice: results, inProgress: false })
        case FETCH_DEVICE_DETAIL:
            return ({ deviceDetail: [], inProgress: true })
        case RECEIVE_DEVICE_DETAIL:
            var results = action.payload
            let list = []
            var count = 0
            var current = 0
            var i = 1
            results.forEach((result) => {
                if(result.counter != current){
                    list.push(result)
                    current = result.counter
                }
            })

            list.forEach((l) => l['no'] = i++)            
            count = list[0].counter - list[list.length - 1].counter

            return Object.assign({}, state, { deviceDetail: list, count, inProgress: false })
        default:
            return state
    }
}