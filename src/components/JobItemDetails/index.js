import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {FiExternalLink} from 'react-icons/fi'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoMdStar} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import SkillCard from '../SkillCard'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const jobdetailsconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    similarJobs: [],
    jobdetailStatus: jobdetailsconstants.initial,
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobdetailStatus: jobdetailsconstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()

      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        title: data.job_details.title,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
      }

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const skills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobs = data.similar_jobs.map(eachjob => ({
        id: eachjob.id,
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        title: eachjob.title,
        rating: eachjob.rating,
      }))
      this.setState({
        jobDetails,
        jobdetailStatus: jobdetailsconstants.success,
        lifeAtCompany,
        skills,
        similarJobs,
      })
    } else {
      this.setState({jobdetailStatus: jobdetailsconstants.failure})
    }
  }

  renderSuccessJobDetailsView = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      employmentType,
      title,
      location,
      rating,
      packagePerAnnum,
    } = jobDetails
    const {imageUrl, description} = lifeAtCompany
    return (
      <div className="jobitem-details-container">
        <Header />
        <div className="li-jobitem-container">
          <div className="image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo-company-image"
            />
            <div>
              <h1 className="desc-heading">{title}</h1>
              <div className="star-container">
                <IoMdStar color="#fbbf24" size={40} />
                <p className="location">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-container">
            <div className="detail-container">
              <IoLocationSharp color="#f1f5f9" size={40} />
              <p className="location">{location}</p>
            </div>
            <div className="detail-container">
              <BsBriefcaseFill color="#f1f5f9" size={40} />
              <p className="location">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="anchor-container">
            <h1 className="desc-heading">Description</h1>
            <a href={companyWebsiteUrl} className="anchor">
              Visit
              <FiExternalLink color="#6366f1" />
            </a>
          </div>
          <p className="location">{jobDescription}</p>
        </div>
        <h1 className="desc-heading">Skills</h1>
        <ul className="ul-skill-container">
          {skills.map(each => (
            <SkillCard key={each.name} skillDetails={each} />
          ))}
        </ul>
        <h1 className="desc-heading">Life at Company</h1>
        <div className="life-container">
          <p className="desc">{description}</p>
          <img src={imageUrl} alt="life at company" className="life-image" />
        </div>
        <h1 className="desc-heading">Similar Jobs</h1>
        <ul className="ul-similar-container">
          {similarJobs.map(each => (
            <SimilarJobs key={each.id} similarJobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderInprogressJobDetailsView = () => (
    <div>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderfailureJobDetailsView = () => (
    <div>
      <Header />
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1 className="desc-heading">Oops! Something Went Wrong</h1>
      <p className="location">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {jobdetailStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    switch (jobdetailStatus) {
      case jobdetailsconstants.success:
        return this.renderSuccessJobDetailsView()
      case jobdetailsconstants.failure:
        return this.renderfailureJobDetailsView()
      case jobdetailsconstants.inProgress:
        return this.renderInprogressJobDetailsView()
      default:
        return null
    }
  }
}

export default JobItemDetails
