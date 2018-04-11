import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/account'

const Nav = ({ email, logout, show }) =>
  <div className="nav">
    <button className="nav__logout" onClick={logout}>
      logout
    </button>
  </div>

const mapDispatchToProps = dispatch => ({
  logout: credentials => dispatch(logout()),
})

const mapStateToProps = (state, props) => ({
  email: state.account.email,
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
