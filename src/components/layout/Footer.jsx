import { siteConfig } from '../../data/siteConfig'
import { anchors, footerNavigation } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-layout">
        <span className="footer-rule" aria-hidden="true" />
        <div className="footer-main">
          <p className="footer-wordmark type-brand-header desktop:type-brand-footer">{siteConfig.wordmark}</p>
          <nav className="footer-navigation" aria-label="Navegación del pie de página">
            {footerNavigation.map(link => (
              <a key={link.href} href={link.href} className="type-body-md desktop:type-navigation-footer">{link.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom type-body-sm desktop:type-footer-meta">
          <p className="footer-copyright">{siteConfig.footerNote}</p>
          <a className="footer-back-to-top" href={anchors.inicio}>{siteConfig.backToTopLabel}</a>
        </div>
      </div>
    </footer>
  )
}
