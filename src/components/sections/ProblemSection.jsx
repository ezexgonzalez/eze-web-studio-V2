import { problem } from '../../data/problem'
import eye from '../../assets/problem/eye.svg'
import search from '../../assets/problem/search.svg'
import help from '../../assets/problem/help.svg'
import logout from '../../assets/problem/logout.svg'
import eyeRing from '../../assets/problem/eye-ring.svg'
import searchRing from '../../assets/problem/search-ring.svg'
import helpRing from '../../assets/problem/help-ring.svg'
import logoutRing from '../../assets/problem/logout-ring.svg'
import trending from '../../assets/problem/trending-down.svg'
import trendingDesktop from '../../assets/problem/trending-down-desktop.svg'

const icons = { eye: [eyeRing, eye], search: [searchRing, search], help: [helpRing, help], logout: [logoutRing, logout] }

export function ProblemSection() {
  return (
    <section className="problem-section" aria-labelledby="problem-heading">
      <div className="section-ambience problem-ambience" aria-hidden="true"><i /><i /><i /></div>
      <div className="problem-content">
        <header className="problem-intro">
          <p className="type-label-eyebrow section-eyebrow">{problem.eyebrow}</p>
          <h2 id="problem-heading" className="type-heading-l">{problem.heading.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</h2>
          <p className="type-body-lg problem-description">{problem.description.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</p>
        </header>
        <ol className="problem-process">
          {problem.steps.map(step => (
            <li className="process-card" key={step.number}>
              <div className="process-symbol">
                <picture className="process-icon" aria-hidden="true"><source media="(min-width: 1200px)" srcSet={icons[step.icon][1]} /><img src={icons[step.icon][0]} alt="" /></picture>
                <span className="process-number">{step.number}</span>
              </div>
              <div className="process-copy"><h3 className="type-title-card">{step.title}</h3><p className={`type-body-md process-description-${step.number}`}>{step.description.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</p></div>
            </li>
          ))}
        </ol>
        <div className="problem-result">
          <picture aria-hidden="true"><source media="(min-width: 1200px)" srcSet={trendingDesktop} /><img src={trending} alt="" /></picture>
          <span className="result-divider" aria-hidden="true" />
          <p className="result-copy"><strong>Resultado:</strong><span>{problem.result}</span></p>
        </div>
      </div>
    </section>
  )
}
