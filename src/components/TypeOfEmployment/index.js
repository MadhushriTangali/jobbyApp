import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const TypeOfEmployment = props => {
  const getEmployement = () =>
    employmentTypesList.map(eachType => {
      const {onEmploymentType} = props
      const OnChangeEmploymentType = () =>
        onEmploymentType(eachType.employmentTypeId)

      return (
        <li className="li-type-container" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            onChange={OnChangeEmploymentType}
            className="input-checkbox"
          />
          <label className="label" htmlFor={eachType.employmentTypeId}>
            {eachType.label}
          </label>
        </li>
      )
    })

  return (
    <div className="employment-container">
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="ul-type-container">{getEmployement()}</ul>
    </div>
  )
}

export default TypeOfEmployment
