import React from 'react'
import { connect } from 'react-redux'

import { user } from '../../actions/account'
import { getImages } from '../../actions/files'
import FullScreenCenter from '../FullScreenCenter'

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
    const { getImages } = props || this.props
    getImages()
  }

  render() {
    const { status, children } = this.props
    if (status === null) {
      return <FullScreenCenter>
        loading…
      </FullScreenCenter>
    }
    return children
  }
}

const mapStateToProps = (state, props) => ({
  status: state.account.status,
})

const mapDispatchToProps = dispatch => ({
  user: () => dispatch(user()),
  getImages: () => dispatch(getImages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Hydrate)
