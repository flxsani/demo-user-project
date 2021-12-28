const initialState = {
    usersList: [],
    user: null,
    loading: false,
    error: false,
    errorMessage: null,
    userToken: null
};
function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, user: null, error: false, loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { ...state, user: action.payload, error: false, loading: false, userToken: action.payload.token }
        case 'USER_LOGIN_ERROR':
            console.log("LoginError::", action);
            return { ...state, user: null, error: true, loading: false, errorMessage: action.payload?.error || '' }

        case 'USER_REGISTER':
            return { ...state, user: null, error: false, loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { ...state, user: action.payload, error: false, loading: false }
        case 'USER_REGISTER_ERROR':
            return { ...state, user: null, error: true, loading: false, errorMessage: action.payload?.error || '' }

        case 'LOAD_USERS':
            return { ...state, usersList: [], error: false, loading: true }
        case 'LOAD_USERS_SUCCESS':
            return { ...state, usersList: action.payload, error: false, loading: false }
        case 'LOAD_USERS_ERROR':
            return { ...state, usersList: [], error: true, loading: false }

        case 'LOAD_USER_PROFILE':
            return { ...state, user: null, error: false, loading: true }
        case 'LOAD_USER_PROFILE_SUCCESS':
            return { ...state, user: action.payload.data, error: false, loading: false }
        case 'LOAD_USER_PROFILE_ERROR':
            return { ...state, user: null, error: true, loading: false }

        case 'RESET_USER':
            return { ...state, user: null, usersList: [], error: false, loading: false, errorMessage: '', userToken: null }
        default:
            return state;
    }
};
export default usersReducer;