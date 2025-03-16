import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: [],
    profileStatus: profileconstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: profileconstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const profile = data.profile_details
      const updatedData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileStatus: profileconstants.success,
      })
    } else {
      this.setState({profileStatus: profileconstants.failure})
    }
  }

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureProfile = () => (
    <div className="button-container">
      <button type="button" className="retry-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderInprogressProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileconstants.success:
        return this.renderSuccessProfile()
      case profileconstants.failure:
        return this.renderFailureProfile()
      case profileconstants.inProgress:
        return this.renderInprogressProfile()
      default:
        return null
    }
  }
}

export default Profile
