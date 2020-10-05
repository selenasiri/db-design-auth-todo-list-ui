import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

//components

import InputTodo from './todolist/InputTodo'
import ListTodos from './todolist/ListTodos'

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('')
  const [allTodos, setAllTodos] = useState([])
  const [todosChange, setTodosChange] = useState(false)
  //set to false, and watch for useEffect to change
  //then pass setTodosChange function in <InputTodo />

  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/dashboard/', {
        headers: { jwt_token: localStorage.getItem('token') },
      })

      setAllTodos(data)

      setName(data[0].user_name)
    } catch (err) {
      console.error(err.message)
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('token')
      setAuth(false)
      toast.success('Logout successfully')
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getProfile()
    setTodosChange(false)
  }, [todosChange])

  return (
    <div>
      <div className='d-flex mt-5 justify-content-around'>
        <h2>{name} 's Todo List</h2>
        <button onClick={(e) => logout(e)} className='btn btn-primary'>
          Logout
        </button>
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  )
}

export default Dashboard

//Problem: Why can we add a new todo but it doesn't pass down to our list below?
//we must set todosChanged to true in InputTodo.js for it to work (adding todo item)

//Once things change in the state it will run GET
