import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

// create a function "authReducer" where it receives the prev. state
//
const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  console.log(type, payload)

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return { ...state, token: null, isAuthenticated: false, loading: false }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    default:
      return state
  }
}

export default authReducer

/* 
auth state:

{
  auth: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3fSwiaWF0IjoxNjAxOTQyMDg0LCJleHAiOjE2MDE5NDU2ODR9.tTU7rkOvlU2xGsRCT3K1ke_mwS5GkhvTXQBCrS7oVlc',
    isAuthenticated: true,
    loading: false,
    user: {
      id: 7,
      name: 'test101',
      email: 'test101@gmail.com'
    }
  }
}
*/
