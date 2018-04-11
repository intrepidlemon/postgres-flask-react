import React from 'react'

import ButtonLink from '../ButtonLink'
import Register from '../Register'
import Login from '../Login'
import FullScreenCenter from '../FullScreenCenter'

import './account.css'

const Account = () =>
  <FullScreenCenter>
    <div className="account__inner">
      <Register/>
      <Login/>
      <ButtonLink
        className="account__reset"
        to="/reset-password"
      >
        reset your password
      </ButtonLink>
    </div>
  </FullScreenCenter>

export default Account
