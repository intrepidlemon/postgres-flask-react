import React from 'react'
import { connect } from 'react-redux'

import { user } from '../../actions/account'

// Hydrate loads all necessary information when a user first logs in
class Hydrate extends React.Component {
  componentDidMount() {
    const { user } = this.props
    user()
  }

  componentWillReceiveProps(props) {
    const { status: newStatus } = props
    const { status: oldStatus } = this.props
    if (newStatus === "logged-in" && oldStatus !== "logged-in") {
      this.hydrate(props)
    }
  }

  hydrate = props => {
    props = props || this.props
  }

  render() {
    const { status, children } = this.props
    if (status === null) {
      return "loading…"
    }
    return children
  }
}

const mapStateToProps = (state, props) => ({
  status: state.account.status,
})

const mapDispatchToProps = dispatch => ({
  user: () => dispatch(user()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Hydrate)
