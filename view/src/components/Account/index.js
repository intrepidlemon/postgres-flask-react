import React from 'react'
import { Link } from 'react-router-dom'

import Register from '../Register'
import Login from '../Login'

const Account = () =>
  <div className="account">
    <Register/>
    <Login/>
    <Link to="/reset-password">
      reset your password
    </Link>
  </div>

export default Account
