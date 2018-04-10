import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from '../../actions/account'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: "",
    }
  }

  emailChange = e => {
    this.setState({
      email: e.target.value,
    })
  }

  passwordChange = e => {
    this.setState({
      password: e.target.value,
    })
  }

  submit = e => {
    e.preventDefault()
    const { login } = this.props
    login({ ...this.state })
      .then(({ status, error }) => {
        if (status !== 200) {
          this.setState({ error })
        }
      })
  }

  render() {
    const { status } = this.props
    const {
      email,
      password,
      error,
    } = this.state
    if ( status === "logged-in" ) {
      return <div className="login">
        You are logged in
      </div>
    }
    return <div className="login">
      <h1>Log in</h1>
      { error &&
        <div className="login__error">{ error }</div>
      }
      <Form
        email={email}
        password={password}
        emailChange={this.emailChange}
        passwordChange={this.passwordChange}
        submit={this.submit}
      />
    </div>
  }
}

const Form = ({
  email,
  password,
  emailChange,
  passwordChange,
  submit,
}) =>
  <form className="login__form">
    <div>
      <input
        className="login__input"
        type="text"
        name="email"
        value={email}
        onChange={emailChange}
        placeholder="email"
      />
    </div>
    <div>
      <input
        className="login__input"
        type="password"
        name="password"
        value={password}
        onChange={passwordChange}
        placeholder="password"
      />
    </div>
    <button
      className="login__submit"
      type="submit"
      onClick={submit}
    >
      Sign up
    </button>
  </form>

const mapStateToProps = (state, props) => ({
  ...props,
  status: state.account.status,
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
