import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import { db, auth } from '../../../config/firebaseConfig'

export const FETCH_USERS = 'FETCH_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export function fetchUsers(){
    return (dispatch, getState) => {
        dispatch({ type: FETCH_USERS })

        db.ref('/users').on('value', (snap) => {
            let data = []
            let list = []
            let arr_obj = Object.keys(snap.val()).map(key => ({ [key]: snap.val()[key] }))

            arr_obj.forEach((result, index) => {
                let Obj = {
                    uid: Object.keys(result)[0]
                }
                let newObj = {
                    ...Obj,
                    ...result[Object.keys(result)]
                } 

                data.push(newObj)
			})

            dispatch({
                type: RECEIVE_USERS,
                payload: data
            })
        })
    }
}
