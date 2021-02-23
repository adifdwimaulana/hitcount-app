import axios from 'axios'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../../config/link'

export const FETCH_TASK = 'FETCH_TASK'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const RECEIVE_APPROVED_TASK = 'RECEIVE_APPROVED_TASK'
export const RECEIVE_REJECTED_TASK = 'RECEIVE_REJECTED_TASK'
export const FAILED_TASK = 'FAILED_TASK'

export function fetchTask(data){
    const auth = cookie.load('token')
    let body = {}

    if(data == undefined){
        body['status'] = 1
    }
    
    body = {...data}

    return (dispatch, getState) => {
        dispatch({ type: FETCH_TASK })

        axios({
            method: 'post',
            url: API_LINKS.TASK_LIST_URL,
            headers: {
                Authorization: auth
            },
            data: body
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    if(data != undefined){
                        if(data.status == 2){
                            dispatch({
                                type: RECEIVE_APPROVED_TASK,
                                payload: response.data.result
                            })
                        } else {
                            dispatch({
                                type: RECEIVE_REJECTED_TASK,
                                payload: response.data.result
                            })
                        }
                    } else {
                        dispatch({
                            type: RECEIVE_TASK,
                            payload: response.data.result
                        })
                    }
                } else {
                    dispatch({ type: FAILED_TASK })
                    return toast.error(response.data.message)
                }
            }
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_TASK
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_TASK
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_TASK
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_TASK
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_TASK
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_TASK
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_TASK
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}