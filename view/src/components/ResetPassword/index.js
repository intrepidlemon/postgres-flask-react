import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { requestReset, performReset } from '../../actions/account'

const ResetPassword = ({ token=null, perform, request }) =>
  <div className="reset-password">
    { token === null
      ? <RequestReset submit={request}/>
      : <PerformReset submit={perform(token)}/>
    }
  </div>

class RequestReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      status: 0,
      error: "",
    }
  }

  updateEmail = e => {
    this.setState({ email: e.target.value })
  }

  submit = e => {
    e.preventDefault()
    const { submit } = this.props
    const { email } = this.state
    this.setState({ error: "" })
    submit(email).then(({ status, error }) => {
      this.setState({ status, error })
    })
  }

  render() {
    const { email, status, error } = this.state
    if (status === 200) {
      return <div className="reset-password__success">
        <h1>Check your email!</h1>
        <p>Your password reset request successfully processed.</p>
      </div>
    }
    return <form
      onSubmit={this.submit}
      className="reset-password__form"
    >
      <h1>Request password reset</h1>
      <input
        className="reset-password__input"
        type="email"
        value={email}
        onChange={this.updateEmail}
        autoFocus
        placeholder="email"
      />
      <button
        className="reset-password__submit"
        type="submit"
      >
        submit
      </button>
      { error &&
        <div className="reset-password__error">
          { error }
        </div>
      }
    </form>
  }
}

class PerformReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      status: 0,
      error: "",
    }
  }

  updatePassword = e => {
    this.setState({ password: e.target.value })
  }

  submit = e => {
    e.preventDefault()
    const { submit } = this.props
    const { password } = this.state
    this.setState({ error: "" })
    submit(password).then(({ status, error }) => {
      this.setState({ status, error })
    })
  }

  render() {
    const { password, status, error } = this.state
    if (status === 200) {
      return <div className="reset-password__success">
        <h1>Password reset</h1>
        <p>Your password was successfully reset.</p>
        <Link
          className="reset-password__link-home"
          to="/"
        >
          go to login
        </Link>
      </div>
    }
    return <form
      onSubmit={this.submit}
      className="reset-password__form"
    >
      <h1>Reset your password</h1>
      <input
        className="reset-password__input"
        type="password"
        value={password}
        onChange={this.updatePassword}
        autoFocus
        placeholder="new password"
      />
      <button
        className="reset-password__submit"
        type="submit"
      >
        submit
      </button>
      { error &&
        <div className="reset-password__error">
          { error }
        </div>
      }
    </form>
  }
}

const mapStateToProps = (state, { match: { params: { token }}}) => ({
  token,
})

const mapDispatchToProps = dispatch => ({
  request: email => dispatch(requestReset(email)),
  perform: token => password => dispatch(performReset(token)(password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

