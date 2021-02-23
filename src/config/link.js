const BASE_URL = 'http://147.139.164.99/api' // Production
// const BASE_URL = 'http://localhost:8000/api' // Development

// User
const USER_URL = BASE_URL + '/user'
const USER_LIST_URL = USER_URL +'/list'
const USER_ADD_URL = USER_URL +'/add'
const USER_UPDATE_URL = USER_URL +'/update'
const USER_DELETE_URL = USER_URL +'/delete'

const LOGIN_URL = BASE_URL + '/login'
const LOGOUT_URL = BASE_URL + '/logoout'
const CHANGE_PASSWORD_URL = USER_URL + '/change/password'

// Role
const ROLE_URL = BASE_URL + '/role'
const ROLE_LIST_URL = ROLE_URL +'/list'
const ROLE_ADD_URL = ROLE_URL +'/add'
const ROLE_UPDATE_URL = ROLE_URL +'/update'
const ROLE_DELETE_URL = ROLE_URL +'/delete'

// Department
const DEPARTMENT_URL = BASE_URL + '/department'
const DEPARTMENT_LIST_URL = DEPARTMENT_URL +'/list'
const DEPARTMENT_ADD_URL = DEPARTMENT_URL +'/add'
const DEPARTMENT_UPDATE_URL = DEPARTMENT_URL +'/update'
const DEPARTMENT_DELETE_URL = DEPARTMENT_URL +'/delete'

// Task Type

const TYPE_TASK_URL = BASE_URL + '/type/task'
const TYPE_TASK_LIST_URL = TYPE_TASK_URL +'/list'
const TYPE_TASK_ADD_URL = TYPE_TASK_URL +'/add'
const TYPE_TASK_UPDATE_URL = TYPE_TASK_URL +'/update'
const TYPE_TASK_DELETE_URL = TYPE_TASK_URL +'/delete'

// Task
const TASK_URL = BASE_URL + '/task'
const TASK_LIST_URL = TASK_URL +'/list'
const TASK_ADD_URL = TASK_URL +'/add'
const TASK_UPDATE_URL = TASK_URL +'/update'
const TASK_DELETE_URL = TASK_URL +'/delete'
const TASK_APPROVE_URL = TASK_URL + '/approve'
const TASK_REJECT_URL = TASK_URL + '/reject'

export {
    BASE_URL,

    USER_URL,
    USER_LIST_URL,
    USER_ADD_URL,
    USER_UPDATE_URL,
    USER_DELETE_URL,
    LOGIN_URL,
    LOGOUT_URL,
    CHANGE_PASSWORD_URL,
    
    ROLE_URL,
    ROLE_LIST_URL,
    ROLE_ADD_URL,
    ROLE_UPDATE_URL,
    ROLE_DELETE_URL,

    DEPARTMENT_URL,
    DEPARTMENT_LIST_URL,
    DEPARTMENT_ADD_URL,
    DEPARTMENT_UPDATE_URL,
    DEPARTMENT_DELETE_URL,

    TYPE_TASK_URL,
    TYPE_TASK_LIST_URL,
    TYPE_TASK_ADD_URL,
    TYPE_TASK_UPDATE_URL,
    TYPE_TASK_DELETE_URL,

    TASK_URL,
    TASK_APPROVE_URL,
    TASK_LIST_URL,
    TASK_ADD_URL,
    TASK_UPDATE_URL,
    TASK_DELETE_URL,
    TASK_REJECT_URL
}