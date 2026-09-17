import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)
  const { links, cta } = siteConfig.navigation
  const hasNavigation = links.length > 0 || Boolean(cta)

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen)

    if (!isOpen) {
      return () => document.body.classList.remove("menu-open")
    }

    const menuControls = Array.from(
      menuRef.current?.querySelectorAll(focusableSelector) ?? [],
    )
    const focusableControls = [menuButtonRef.current, ...menuControls].filter(
      Boolean,
    )

    menuControls[0]?.focus()

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== "Tab" || focusableControls.length === 0) return

      const firstControl = focusableControls[0]
      const lastControl = focusableControls.at(-1)

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault()
        lastControl.focus()
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault()
        firstControl.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.classList.remove("menu-open")
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-[var(--theme-border)] bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Container as="nav" className="flex min-h-16 items-center justify-between">
        <a
          href="#main-content"
          className="text-base font-semibold focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
          onClick={closeMenu}
        >
          {siteConfig.businessName}
        </a>

        {hasNavigation ? (
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                className="text-sm text-[var(--theme-muted)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
                href={link.href}
                key={`${link.href}-${link.label}`}
              >
                {link.label}
              </a>
            ))}
            {cta ? (
              <Button href={cta.href} external={cta.external}>
                {cta.label}
              </Button>
            ) : null}
          </div>
        ) : null}

        {hasNavigation ? (
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="relative flex size-11 items-center justify-center rounded-[var(--theme-radius)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)] md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <span
              aria-hidden="true"
              className={[
                "h-px w-6 bg-current before:absolute before:left-1/2 before:h-px before:w-6 before:-translate-x-1/2 before:bg-current after:absolute after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:bg-current",
                isOpen
                  ? "bg-transparent before:rotate-45 after:-rotate-45"
                  : "before:-translate-y-2 after:translate-y-2",
              ].join(" ")}
            />
          </button>
        ) : null}
      </Container>

      {hasNavigation ? (
        <div
          className={[
            "absolute inset-x-0 top-full border-t border-[var(--theme-border)] bg-[var(--theme-background)] md:hidden",
            isOpen ? "block" : "hidden",
          ].join(" ")}
          id="mobile-navigation"
          ref={menuRef}
        >
          <Container className="flex min-h-[calc(100vh-4rem)] flex-col items-start gap-6 py-6">
            {links.map((link) => (
              <a
                className="min-h-11 py-2 text-lg font-medium focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
                href={link.href}
                key={`${link.href}-${link.label}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            {cta ? (
              <Button
                href={cta.href}
                external={cta.external}
                onClick={closeMenu}
              >
                {cta.label}
              </Button>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
