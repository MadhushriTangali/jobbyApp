import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoMdStar} from 'react-icons/io'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    title,
    employmentType,
  } = similarJobDetails
  return (
    <li className="li-similarjob-container">
      <div className="image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="desc-heading">Description</h1>
      <p className="location">{jobDescription}</p>
      <div className="middle-container">
        <div className="detail-container">
          <IoLocationSharp color="#f1f5f9" size={40} />
          <p className="location">{location}</p>
        </div>
        <div className="detail-container">
          <BsBriefcaseFill color="#f1f5f9" size={40} />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
