import React from 'react'
import { connect } from 'react-redux'

import { requestReset, performReset } from '../../actions/account'

import Flex from '../Flex'
import Button from '../Button'
import ButtonLink from '../ButtonLink'
import TextInput from '../TextInput'
import FullScreenCenter from '../FullScreenCenter'
import Error from '../Error'

import './reset-password.css'

const ResetPassword = ({ token=null, perform, request }) =>
  <FullScreenCenter>
    { token === null
      ? <RequestReset submit={request}/>
      : <PerformReset submit={perform(token)}/>
    }
  </FullScreenCenter>

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
    submit(email).then(({ status, data }) => {
      this.setState({ status, error: data })
    })
  }

  render() {
    const { email, status, error } = this.state
    if (status === 200) {
      return <Flex>
        <h1>Check your email!</h1>
        <p>Your password reset request successfully processed.</p>
      </Flex>
    }
    return <form
      onSubmit={this.submit}
    >
      <Flex>
        <h1>Request password reset</h1>
        <TextInput
          type="email"
          value={email}
          onChange={this.updateEmail}
          autoFocus
          placeholder="email"
        />
        <Button
          type="submit"
        >
          submit
        </Button>
        { error &&
          <Error>
            { error }
          </Error>
        }
      </Flex>
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
    submit(password).then(({ status, data }) => {
      this.setState({ status, error: data })
    })
  }

  render() {
    const { password, status, error } = this.state
    if (status === 200) {
      return <Flex>
        <h1>Password reset</h1>
        <p>Your password was successfully reset.</p>
        <ButtonLink
          className="reset-password__link-home"
          to="/"
        >
          go to login
        </ButtonLink>
      </Flex>
    }
    return <form
      onSubmit={this.submit}
    >
      <Flex>
        <h1>Reset your password</h1>
        <TextInput
          type="password"
          value={password}
          onChange={this.updatePassword}
          autoFocus
          placeholder="new password"
        />
        <Button
          type="submit"
        >
          submit
        </Button>
        { error &&
          <Error>
            { error }
          </Error>
        }
      </Flex>
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

