import { solution } from '../../data/solution'

export function SolutionSection() {
  return (
    <section className="solution-section" aria-labelledby="solution-heading">
      <div className="section-ambience solution-ambience" aria-hidden="true"><i /><i /><i /></div>
      <div className="solution-content">
        <header className="solution-intro"><h2 id="solution-heading" className="type-label-eyebrow section-eyebrow">{solution.eyebrow}</h2><p>{solution.intro}</p></header>
        <ol className="solution-features">
          {solution.features.map(feature => (
            <li className={`solution-feature solution-feature-${feature.number}`} key={feature.number}>
              <div className="solution-notation"><span>{feature.number}</span><i aria-hidden="true" /><b aria-hidden="true" /></div>
              <h3 className="type-display-feature">{feature.title}</h3>
              <p className="solution-description">{feature.description.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
