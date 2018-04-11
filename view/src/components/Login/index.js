import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flex from '../Flex'
import Button from '../Button'
import TextInput from '../TextInput'
import Error from '../Error'

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
    return <Flex>
      <Form
        email={email}
        password={password}
        emailChange={this.emailChange}
        passwordChange={this.passwordChange}
        submit={this.submit}
      />
      { error &&
        <Error>
          { error }
        </Error>
      }
    </Flex>
  }
}

const Form = ({
  email,
  password,
  emailChange,
  passwordChange,
  submit,
}) =>
  <form
    className="login__form"
    onSubmit={submit}
  >
    <Flex>
      <h1>log in</h1>
      <TextInput
        type="text"
        name="email"
        value={email}
        onChange={emailChange}
        placeholder="email"
      />
      <TextInput
        type="password"
        name="password"
        value={password}
        onChange={passwordChange}
        placeholder="password"
      />
      <Button
        className="login__submit"
        type="submit"
      >
        log in
      </Button>
    </Flex>
  </form>

const mapStateToProps = (state, props) => ({
  ...props,
  status: state.account.status,
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
