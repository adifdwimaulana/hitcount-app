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
            console.log(arr_obj)

			arr_obj.forEach((result, index) => {
				data.push(result[Object.keys(result)])
			})
			data.forEach((result, index) => {
                list.push({
                    label: result.email,
                    value: result.email
                })
            })

            dispatch({
                type: RECEIVE_USERS,
                payload: list
            })
        })
    }
}
