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
      'http://localhost:5000/authentication/login',
      body,
      config
    )
    console.log(res, res.data)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    toast.success('Logged in Successfully')
    // dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      toast.error(error.msg)
    }

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}
