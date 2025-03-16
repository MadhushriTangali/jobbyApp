import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, error: ''}

  onSuccessSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onFailureSubmit = error => {
    this.setState({showError: true, error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onFailureSubmit(data.error_msg)
    }
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="outer-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="image"
            alt="website logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              onChange={this.onUsername}
              value={username}
              id="username"
              className="input-element"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={this.onPassword}
              value={password}
              id="password"
              className="input-element"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {showError && <p className="error">*{error}</p>}
        </form>
      </div>
    )
  }
}

export default Login
