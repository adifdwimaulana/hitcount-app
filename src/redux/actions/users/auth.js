import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import { db, auth } from '../../../config/firebaseConfig'

export const FETCH_LOGIN = 'FETCH_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const RESET_LOGIN = 'RESET_LOGIN'

export const FETCH_LOGOUT = 'FETCH_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
export const FAILED_LOGOUT = 'FAILED_LOGOUT'

export function fetchLogin(email, password){
    return (dispatch, getState) => {
        dispatch({ type: FETCH_LOGIN })

        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                db.ref(`/users/${auth.currentUser.uid}`).once('value', (snap) => {
                    const data = snap.val()
                    
                    dispatch({
                        type: RECEIVE_LOGIN,
                        payload: data
                    })

                    cookie.save('isAuthenticated', true, {path: '/'})
                    cookie.save('isAdmin', data.admin, {path: '/'})
                    cookie.save('email', data.email, {path: '/'})
                    cookie.save('name', data.firstName + " " + data.lastName, {path: '/'})
                    return toast.success("Login success!")
                })
            }).catch(error => {
                dispatch({ type: FAILED_LOGIN })

                return toast.error(error.message)
            })
    }
}

export function fetchLogout(){
    return (dispatch, getState) => {
        dispatch({ type: FETCH_LOGOUT })

        auth
            .signOut()
            .then((response) => {

                dispatch({
                    type: RECEIVE_LOGOUT,
                    payload: response
                })

                cookie.remove('isAuthenticated', {path: '/'})
                cookie.remove('isAdmin', {path: '/'})
                cookie.remove('email', {path: '/'})
                cookie.remove('name', {path: '/'})

                return toast.success("Logout Success!")
            })
            .catch(error => {
                dispatch({ type: FAILED_LOGOUT })

                return toast.error(error.message)
            })
    }
}