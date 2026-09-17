import { siteConfig } from '../../data/siteConfig'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-[var(--theme-border)]">
      <Container className="flex flex-col gap-3 py-6 text-sm text-[var(--theme-muted)] sm:flex-row sm:items-center sm:justify-between">
        <strong className="font-semibold text-[var(--theme-text)]">
          {siteConfig.businessName}
        </strong>
        {siteConfig.footerNote ? <span>{siteConfig.footerNote}</span> : null}
      </Container>
    </footer>
  )
}
