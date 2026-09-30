import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../data/navigation'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { ArrowUpRight } from '../ui/ArrowUpRight'

const desktopQuery = '(min-width: 75rem)'

export function Navbar() {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const homeRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery)
    const dialog = dialogRef.current
    const closeAtDesktop = () => {
      if (desktop.matches && dialog.open) dialog.close()
    }
    desktop.addEventListener('change', closeAtDesktop)
    return () => {
      desktop.removeEventListener('change', closeAtDesktop)
      document.body.classList.remove('menu-open')
      if (dialog.open) dialog.close()
    }
  }, [])

  function openMenu() {
    dialogRef.current.showModal()
    closeRef.current.focus({ preventScroll: true })
    document.body.classList.add('menu-open')
    setIsOpen(true)
  }

  function closeMenu() { dialogRef.current.close() }

  function restoreFocus() {
    document.body.classList.remove('menu-open')
    setIsOpen(false)
    const target = window.matchMedia(desktopQuery).matches ? homeRef.current : triggerRef.current
    target?.focus({ preventScroll: true })
  }

  return (
    <>
      <header className="site-header">
        <Container variant="wide" className="header-inner">
          <a href={navigation.home} className="header-brand type-brand-header" ref={homeRef}>EZE WEB STUDIO</a>
          <nav aria-label="Navegación principal" className="desktop-nav type-navigation-header">
            {navigation.links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <Button href={navigation.cta.href} variant="outline" className="header-cta">{navigation.cta.label}<ArrowUpRight /></Button>
          <button type="button" className="menu-control type-label-cta" ref={triggerRef}
            aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={openMenu}>MENÚ</button>
        </Container>
      </header>
      <dialog id="mobile-navigation" className="mobile-navigation" aria-label="Navegación principal"
        ref={dialogRef} onClose={restoreFocus} onCancel={closeMenu}>
        <Container variant="wide" className="mobile-navigation-header">
          <a href={navigation.home} className="header-brand type-brand-header" onClick={closeMenu}>EZE WEB STUDIO</a>
          <button type="button" className="menu-control type-label-cta" onClick={closeMenu} ref={closeRef}>CERRAR</button>
        </Container>
        <nav aria-label="Navegación móvil" className="mobile-navigation-links">
          {navigation.links.map(link => <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a href={navigation.cta.href} className="mobile-navigation-contact" onClick={closeMenu}>{navigation.cta.label}</a>
        </nav>
      </dialog>
    </>
  )
}
