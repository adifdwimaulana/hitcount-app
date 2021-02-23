import axios from 'axios'
import { get } from 'jquery'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../../config/link'

export const FETCH_DEPARTMENT = 'FETCH_DEPARTMENT'
export const RECEIVE_DEPARTMENT = 'RECEIVE_DEPARTMENT'
export const RECEIVE_INACTIVE_DEPARTMENT = 'RECEIVE_INACTIVE_DEPARTMENT'
export const FAILED_DEPARTMENT = 'FAILED_DEPARTMENT'

export function fetchDepartment(data){
    const auth = cookie.load('token')
    let body = {}

    if(data == undefined){
        body['status'] = 1
    }

    body = {...data}

    return (dispatch, getState) => {
        dispatch({ type: FETCH_DEPARTMENT })

        axios({
            method: 'post',
            url: API_LINKS.DEPARTMENT_LIST_URL,
            headers: {
                Authorization: auth
            },
            data: body
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    if(data != undefined){
                        dispatch({
                            type: RECEIVE_INACTIVE_DEPARTMENT,
                            payload: response.data.result
                        })
                    } else {
                        dispatch({
                            type: RECEIVE_DEPARTMENT,
                            payload: response.data.result
                        })
                    }
                } else {
                    dispatch({ type: FAILED_DEPARTMENT })
                    return toast.error(response.data.message)
                }
            } 
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_DEPARTMENT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_DEPARTMENT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_DEPARTMENT
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_DEPARTMENT
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_DEPARTMENT
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_DEPARTMENT
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_DEPARTMENT
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}