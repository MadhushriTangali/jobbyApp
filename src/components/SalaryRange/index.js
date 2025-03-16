import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const SalaryRange = props => {
  const getSalary = () =>
    salaryRangesList.map(each => {
      const {onSalaryRange} = props
      const OnChangeSalaryRange = () => onSalaryRange(each.salaryRangeId)
      return (
        <li
          className="li-type-container"
          key={each.salaryRangeId}
          onChange={OnChangeSalaryRange}
        >
          <input
            type="radio"
            id={each.salaryRangeId}
            className="input-checkbox"
            value={each.salaryRangeId}
            name="salary"
          />
          <label className="label" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      )
    })

  return (
    <div className="employment-container">
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="ul-type-container">{getSalary()}</ul>
    </div>
  )
}

export default SalaryRange
