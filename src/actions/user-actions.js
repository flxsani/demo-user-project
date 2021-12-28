import ApiService from '../utils/api';

const UserActions = {
    userLogin(dispatch, data) {
        dispatch({ type: 'USER_LOGIN', payload: null })
        ApiService.postMethod('login', data).then(users => {
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: users })
        }).catch((e) => {
            dispatch({ type: 'USER_LOGIN_ERROR', payload: e.response?.data || 'Something went wrong. Please try later.'})
        }).finally(() => { })
    },
    userRegistration(dispatch, data) {
        dispatch({ type: 'USER_REGISTER', payload: null })
        ApiService.postMethod('users', data).then(users => {
            dispatch({ type: 'USER_REGISTER_SUCCESS', payload: users })
        }).catch((e) => {
            dispatch({ type: 'USER_REGISTER_ERROR', payload: e.response?.data || 'Something went wrong. Please try later.' })
        }).finally(() => { })
    },
    loadUsers(dispatch) {
        dispatch({ type: 'LOAD_USERS', payload: null })
        ApiService.getMethod('users').then(users => {
            dispatch({ type: 'LOAD_USERS_SUCCESS', payload: users })
        }).catch((e) => {
            dispatch({ type: 'LOAD_USERS_ERROR', payload: e.response?.data || 'Something went wrong. Please try later.' })
        }).finally(() => { })
    },
    loadUserProfile(dispatch, userId) {
        dispatch({ type: 'LOAD_USER_PROFILE', payload: null })
        ApiService.getMethod('users/'+userId).then(users => {
            dispatch({ type: 'LOAD_USER_PROFILE_SUCCESS', payload: users })
        }).catch((e) => {
            dispatch({ type: 'LOAD_USER_PROFILE_ERROR', payload: e.response?.data || 'Something went wrong. Please try later.' })
        }).finally(() => { })
    },
    resetUser(dispatch) {
        dispatch({ type: 'RESET_USER', payload: null })
    },
}
export default UserActions;