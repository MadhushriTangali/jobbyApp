import './index.css'
import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoMdStar} from 'react-icons/io'

const JobItem = props => {
  const {companyDetails} = props
  const {
    companyLogoUrl,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    employmentType,
  } = companyDetails
  return (
    <Link to={`/jobs/${id}`} className="link-jobitem">
      <li className="li-jobitem-container">
        <div className="image-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="desc-heading">Description</h1>
        <p className="location">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
