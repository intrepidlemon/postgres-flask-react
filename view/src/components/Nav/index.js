import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/account'
import Button from '../Button'

import './nav.css'

const Nav = ({ email, logout, show }) =>
  <div className="nav">
    <div/>
    <Button className="nav__exit" onClick={logout}>
      &times;
    </Button>
  </div>

const mapDispatchToProps = dispatch => ({
  logout: credentials => dispatch(logout()),
})

const mapStateToProps = (state, props) => ({
  email: state.account.email,
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
