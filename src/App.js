import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//components

import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard/Dashboard'
import Landing from './components/Landing'

import { Provider } from 'react-redux'
import { store } from './store'

toast.configure()

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
