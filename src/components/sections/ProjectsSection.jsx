import { projects, projectsSection } from '../../data/projects'
import { useProjectCarousel } from '../../hooks/useProjectCarousel'
import { Button } from '../ui/Button'
import glowDesktop from '../../assets/projects/glow-desktop.svg'
import glowMobile from '../../assets/projects/glow-mobile.svg'
import arrowLeftDesktop from '../../assets/projects/arrow-left-desktop.svg'
import arrowRightDesktop from '../../assets/projects/arrow-right-desktop.svg'
import arrowLeftMobile from '../../assets/projects/arrow-left-mobile.svg'
import arrowRightMobile from '../../assets/projects/arrow-right-mobile.svg'
import arrowUpRight from '../../assets/projects/arrow-up-right.svg'

function ProjectPreview({ project }) {
  return project?.preview ? <img className="project-preview" src={project.preview} alt="" /> : null
}

// An injectable dataset permits isolated interaction QA; App always uses approved data.
export function ProjectsSection({ items = projects }) {
  const { activeIndex, viewportRef, selectProject, onKeyDown } = useProjectCarousel(items.length)
  const activeProject = items[activeIndex]
  if (!activeProject) return null
  const multiple = items.length > 1
  const desktopSlots = [
    ['previous', items[activeIndex - 1]],
    ['active', activeProject],
    ['next', items[activeIndex + 1]],
    ['queue', items[activeIndex + 2]],
  ]

  return (
    <section id="proyectos" className="projects-section" aria-labelledby="projects-heading">
      <div className="projects-backdrop" aria-hidden="true">
        <img className="projects-glow-mobile" src={glowMobile} alt="" width="390" height="690" />
        <img className="projects-glow-desktop" src={glowDesktop} alt="" width="1242" height="901" />
      </div>
      <div className="projects-content">
        <header className="projects-header">
          <div className="projects-heading-group"><p className="type-label-eyebrow">{projectsSection.eyebrow}</p><h2 id="projects-heading" className="type-heading-l">{projectsSection.heading.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</h2></div>
          <span className="projects-header-divider" aria-hidden="true" />
          <p className="projects-intro type-body-md">{projectsSection.intro.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}</p>
        </header>
        <div className="projects-carousel" role="group" aria-roledescription="carrusel" aria-labelledby="projects-heading">
          <div className="projects-mobile-stage">
            {!multiple && <div className="projects-empty-peek" aria-hidden="true"><div className="projects-slot" /><div className="projects-slot" /></div>}
            <div className={`projects-viewport${multiple ? ' projects-viewport-scrollable' : ''}`} ref={viewportRef} tabIndex={multiple ? 0 : undefined} onKeyDown={onKeyDown} role={multiple ? 'group' : undefined} aria-label={multiple ? 'Vistas previas de proyectos' : undefined} aria-describedby={multiple ? 'project-information' : undefined}>
              <div className="projects-track" aria-hidden="true">{items.map(project => <div className="projects-slot" key={project.id} data-project-slide><ProjectPreview project={project} /></div>)}</div>
            </div>
          </div>
          <div className="projects-desktop-stage" aria-hidden="true">{desktopSlots.map(([position, project]) => <div className={`projects-slot projects-slot-${position}`} key={position}><ProjectPreview project={project} /></div>)}</div>
          <div className="projects-controls">
            <button className="projects-control projects-previous" type="button" aria-label="Proyecto anterior" aria-controls="project-information" disabled={activeIndex === 0} onClick={() => selectProject(activeIndex - 1)}><picture aria-hidden="true"><source media="(min-width: 1200px)" srcSet={arrowLeftDesktop} /><img src={arrowLeftMobile} alt="" /></picture><span className="type-label-meta">ANTERIOR</span><i aria-hidden="true" /></button>
            <p className="projects-pagination" aria-hidden="true"><span>{String(activeIndex + 1).padStart(2, '0')}</span><span>/</span><span>{String(items.length).padStart(2, '0')}</span></p>
            <button className="projects-control projects-next" type="button" aria-label="Proyecto siguiente" aria-controls="project-information" disabled={activeIndex === items.length - 1} onClick={() => selectProject(activeIndex + 1)}><i aria-hidden="true" /><span className="type-label-meta">SIGUIENTE</span><picture aria-hidden="true"><source media="(min-width: 1200px)" srcSet={arrowRightDesktop} /><img src={arrowRightMobile} alt="" /></picture></button>
          </div>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Proyecto {activeIndex + 1} de {items.length}: {activeProject.title}</p>
          <article id="project-information" className="project-information" aria-labelledby="project-title">
            <p className="project-category type-label-meta">{activeProject.category}</p>
            <h3 id="project-title" className="type-heading-m">{activeProject.title}</h3>
            <p className="project-description type-body-md">{activeProject.description}</p>
            <Button className="projects-cta" variant="outline" href={activeProject.url ?? undefined} disabled={!activeProject.url} external={Boolean(activeProject.url)}>{projectsSection.cta}<img src={arrowUpRight} alt="" aria-hidden="true" width="14" height="14" /></Button>
          </article>
        </div>
      </div>
    </section>
  )
}
