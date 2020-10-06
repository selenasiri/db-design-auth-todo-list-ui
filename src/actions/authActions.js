import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'

import { toast } from 'react-toastify'

// Login user

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post(
      'http://localhost:5000/auth/login',
      body,
      config
    )
    console.log(res, res.data)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    // localStorage.setItem('token', res.data.token)
    toast.success('Logged in Successfully')
    // dispatch(loadUser())
  } catch (err) {
    console.log(err)
    toast.error(err.message)

    localStorage.removeItem('token')
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  console.log('logout')
  dispatch({ type: LOGOUT })
  localStorage.removeItem('token')
}
