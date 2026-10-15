import { hero } from '../../data/hero'
import { sectionIds } from '../../data/navigation'
import { Button } from '../ui/Button'
import { ArrowUpRight } from '../ui/ArrowUpRight'
import { HeroBackground } from './HeroBackground'
export function HeroSection() {
  return (
    <section id={sectionIds.inicio} className="hero" aria-labelledby="hero-heading">
      <HeroBackground />
      <div className="hero-content">
        <h1 id="hero-heading" className="hero-heading type-display-hero">{hero.headline.map(line => <span key={line}>{line}</span>)}</h1>
        <p className="hero-description">{hero.descriptionLines.map((line, i) => <span key={line}>{i > 0 ? ' ' : ''}{line}</span>)}</p>
        <div className="hero-actions">
          <Button href={hero.projects.href} className="hero-primary">{hero.projects.label}</Button>
          <Button href={hero.contact.href} variant="outline" className="hero-outline">{hero.contact.label}<ArrowUpRight /></Button>
        </div>
      </div>
    </section>
  )
}
