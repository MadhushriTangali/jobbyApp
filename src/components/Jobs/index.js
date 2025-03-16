import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import Header from '../Header'
import JobItem from '../JobItem'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryRange from '../SalaryRange'
import './index.css'

const jobconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    range: 0,
    joblist: [],
    searchInput: '',
    jobstatus: jobconstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {range, employmentType, searchInput} = this.state
    this.setState({jobstatus: jobconstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${range}&search=${searchInput}`
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        joblist: updatedData,
        jobstatus: jobconstants.success,
      })
    } else {
      this.setState({jobstatus: jobconstants.failure})
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  enterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onEmploymentType = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJobDetails,
    )
  }
  onSalaryRange = salary => {
    this.setState({range: salary}, this.getJobsList)
  }

  renderJobSuccess = () => {
    const {searchInput, joblist} = this.state
    return (
      <div>
        {joblist.length > 0 ? (
          <div>
            <Header />
            <div className="success-container">
              {this.renderInitialCode()}
              <div className="list-container">
                <div className="search-container">
                  <input
                    type="search"
                    value={searchInput}
                    className="search-element"
                    onChange={this.onSearch}
                    placeholder="Search"
                  />
                  <button
                    type="button"
                    data-testid="searchButton"
                    className="search-button"
                    onClick={this.getJobsList}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
                <ul className="ul-container">
                  {joblist.map(eachJob => (
                    <JobItem key={eachJob.id} companyDetails={eachJob} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="success-container">
            <Header />
            {this.renderInitialCode()}
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                className="search-element"
                onChange={this.onSearch}
                onKeyDown={this.enterKey}
                placeholder="Search"
              />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="desc-heading">No Jobs Found</h1>
            <p className="location">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </div>
    )
  }

  renderJobFailure = () => {
    const {searchInput} = this.state
    return (
      <div className="success-container">
        <Header />
        {this.renderInitialCode()}
        <div className="list-container">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="search-element"
              onChange={this.onSearch}
              placeholder="Search"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
            >
              <BsSearch className="search-icon" size={50} />
            </button>
          </div>
          <div>
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
              onClick={this.getJobsList}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderJobInprogress = () => {
    const {searchInput} = this.state
    return (
      <div className="success-container">
        <Header />
        {this.renderInitialCode()}
        <div className="list-container">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="search-element"
              onChange={this.onSearch}
              placeholder="Search"
              onKeyDown={this.enterKey}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      </div>
    )
  }

  renderInitialCode = () => (
    <div className="left-container">
      <Profile />
      <hr className="hr-line" />
      <TypeOfEmployment onEmploymentType={this.onEmploymentType} />
      <hr className="hr-line" />
      <SalaryRange onSalaryRange={this.onSalaryRange} />
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {jobstatus} = this.state
    switch (jobstatus) {
      case jobconstants.success:
        return this.renderJobSuccess()
      case jobconstants.failure:
        return this.renderJobFailure()
      case jobconstants.inProgress:
        return this.renderJobInprogress()
      default:
        return null
    }
  }
}

export default Jobs
