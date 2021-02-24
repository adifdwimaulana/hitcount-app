import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import { db, auth } from '../../../config/firebaseConfig'
import moment from 'moment'

export const FETCH_DEVICE = 'FETCH_DEVICE'
export const RECEIVE_DEVICE = 'RECEIVE_DEVICE'
export const FAILED_DEVICE = 'FAILED_DEVICE'

export const FETCH_DEVICE_DETAIL = 'FETCH_DEVICE_DETAIL'
export const RECEIVE_DEVICE_DETAIL = 'RECEIVE_DEVICE_DETAIL'
export const FAILED_DEVICE_DETAIL = 'FAILED_DEVICE_DETAIL'

export function fetchDevice(id){
    if(id == undefined){
        return (dispatch, getState) => {
            dispatch({ type: FETCH_DEVICE })

            db.ref('/devices').on('value', (snap) => {
                let data = []
                let filter = []
                let arr_obj = Object.keys(snap.val()).map(key => ({ [key]: snap.val()[key] }))
                console.log(arr_obj)
                arr_obj.forEach((result, index) => {
                    data.push(result[Object.keys(result)])
                })
                
                data.forEach((result, index) => {
                    if(cookie.load('isAdmin') == "false"){
                        if(result.pic == cookie.load('email')){
                            filter.push(result)
                        }
                    } else {
                        filter = data
                    }
                })
                
                dispatch({
                    type: RECEIVE_DEVICE,
                    payload: filter
                })
            })
        }
    } else {
        return (dispatch, getState) => {
            dispatch({ type: FETCH_DEVICE_DETAIL })

            db.ref(`/devices/${id}/logs`).on('value', snap => {
                if(snap.val()){
                    let arr_obj = Object.keys(snap.val()).map(key => ({ [key]: snap.val()[key] }))
        
                    let list = []
        
                    arr_obj.reverse().forEach((result, index) => {
                        let string = Object.keys(result)[0].split(' : ')
                        let date = string[0]
                        let time = string[1]
                        let res = result[Object.keys(result)[0]]
                        
                        list.push({
                            date: date,
                            timestamp: time,
                            id,
                            counter: res
                        })
                    })

                    dispatch({
                        type: RECEIVE_DEVICE_DETAIL,
                        payload: list,
                        count: 0
                    })
                }
            })
        }
    }
}

export function fetchDeviceRange(id, startDate, endDate){
    return (dispatch, getState) => {
        dispatch({  type: FETCH_DEVICE_DETAIL })

        db.ref(`/devices/${id}/logs`).once('value', snap => {
            if(snap.val()){
                let arr_obj = Object.keys(snap.val()).map(key => ({ [key]: snap.val()[key] }))
    
                let list = []
                let count = 0
                let val = 0

                arr_obj.reverse().forEach((result, index) => {
                    let string = Object.keys(result)[0].split(' : ')
                    let date = string[0]
                    let time = string[1]
                    let res = result[Object.keys(result)[0]]
    
                    let times = date + ' ' + time
                    let timeFormat = moment(times, 'YYYY-MM-DD HH:mm:ss')
                    
                    if(moment(timeFormat).isSameOrAfter(moment(startDate)) == true && moment(timeFormat).isSameOrBefore(moment(endDate)) == true){
                        if(val != res){
                            count++
                        }
                        val = res
                        list.push({
                            date: date,
                            timestamp: time,
                            id: id,
                            counter: res
                        })
                    }
                })
                dispatch({
                    type: RECEIVE_DEVICE_DETAIL,
                    payload: list,
                    count: count
                })
            }
        })
    }
}