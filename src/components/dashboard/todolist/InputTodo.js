import React, { Fragment, useState } from 'react'
import axios from 'axios'

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = { description }

      await axios.post('http://localhost:5000/dashboard/todos', body, {
        headers: {
          'Content-Type': 'application/json',
          jwt_token: localStorage.getItem('token'),
        },
      })

      setTodosChange(true) //final step (see Dashboard notes)
      setDescription('')
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>
      <h1 className='text-center my-5'>Input Todo</h1>
      <form className='d-flex' onSubmit={onSubmitForm}>
        <input
          type='text'
          placeholder='add todo'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success '>Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo
