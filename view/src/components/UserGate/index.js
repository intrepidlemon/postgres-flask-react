import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Account from '../Account'

const UserGate = ({ children, status, gate }) => {
  if (status !== "logged-in") {
    if (gate) {
      return gate()
    }
    return <Account/>
  }
  return children
}

const mapStateToProps = (state, props) => ({
  status: state.account.status,
})

export default withRouter(connect(mapStateToProps)(UserGate))
