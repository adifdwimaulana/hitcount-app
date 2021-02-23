import axios from 'axios'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../../config/link'

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

        axios({
            method: 'post',
            url: API_LINKS.LOGIN_URL,
            data: { email, password }
        })
        .then((response) => {
            if(response.status === 200) {
                if (response.data.status === 200) {
                    dispatch( {
                        type: RECEIVE_LOGIN,
                        payload: response.data.result
                    })
                    cookie.save('userId', response.data.result.id, {path: '/'})
                    cookie.save('name', response.data.result.name, {path: '/'})
                    cookie.save('token', response.data.result.token, {path: '/'})
                    cookie.save('email', response.data.result.email, {path: '/'})
                    cookie.save('roleId', response.data.result.role_id, {path: '/'})
                    cookie.save('departmentId', response.data.result.department_id, {path: '/'})
                    cookie.save('isAuthenticated', true, {path: '/'})
                } else {
                    dispatch({ type: FAILED_LOGIN })
                    return toast.error(response.data.message);
                }
            } else {
                dispatch({
                    type: FAILED_LOGIN
                })
                return toast.error("Invalid username or password! Please try again!");
            }
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_LOGIN
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_LOGIN
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}

export function fetchLogout(){
    const token = cookie.load('token')

    return (dispatch, getState) => {
        dispatch({ type: FETCH_LOGOUT })

        axios({
            method: 'post',
            url: API_LINKS.LOGOUT_URL,
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            if(response.status === 200) {
                if (response.data.status === 200) {
                    dispatch({
                        type: RECEIVE_LOGOUT,
                        payload: response.data.result
                    })
                    cookie.remove('userId', {path: '/'})
                    cookie.remove('name', {path: '/'})
                    cookie.remove('token', {path: '/'})
                    cookie.remove('email', {path: '/'})
                    cookie.remove('roleId', {path: '/'})
                    cookie.remove('departmentId', {path: '/'})
                    cookie.remove('isAuthenticated', {path: '/'})
                } else {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error(response.data.message);
                }
            } else {
                dispatch({
                    type: FAILED_LOGOUT
                })
                return toast.error("Invalid username or password! Please try again!");
            }
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_LOGOUT
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_LOGOUT
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_LOGOUT
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}