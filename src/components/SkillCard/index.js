import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="li-skill-container">
      <img src={imageUrl} alt={name} className="skills-image" />
      <h1 className="skill-name">{name}</h1>
    </li>
  )
}

export default SkillCard
