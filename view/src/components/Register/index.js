import React, { Component } from 'react'
import { connect } from 'react-redux'

import { register } from '../../actions/account'

class Register extends Component {
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
    const { register } = this.props
    register({ ...this.state })
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
      return <div className="signup">
        You are logged in
      </div>
    }
    return <div className="signup">
      <h1>Sign up</h1>
      { error &&
        <div className="signup__error">{ error }</div>
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
  <form className="signup__form">
    <div>
      <input
        className="signup__input"
        type="text"
        name="email"
        value={email}
        onChange={emailChange}
        placeholder="email"
      />
    </div>
    <div>
      <input
        className="signup__input"
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
  register: credentials => dispatch(register(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
