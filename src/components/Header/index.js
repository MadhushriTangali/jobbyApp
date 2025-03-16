import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="ul-link-container">
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="image"
              alt="website logo"
            />
          </li>
        </Link>
        <Link to="/" className="link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
