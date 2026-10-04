import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HeroLightArc } from '../effects/HeroLightArc'
import { useHeroMotionPreferences } from '../../hooks/useHeroMotionPreferences'
import desktopBody from '../../assets/hero/desktop-body.svg'
import mobileBody from '../../assets/hero/mobile-body.svg'
import star2 from '../../assets/hero/star-2.svg'
import star3 from '../../assets/hero/star-3.svg'
import star4 from '../../assets/hero/star-4.svg'
import productionBody from '../../assets/hero/production-body.svg'
import productionWideBody from '../../assets/hero/production-wide-body.svg'
const productionStars = [[132,202],[152,336],[218,465],[302,690],[843,286],[1120,196],[1275,678],[1374,218],[1138,760],[1122,818]]
const stars = [[144,216,3],[166,354,4],[237,482,4],[328,694,3],[901,292,3],[1193,206,3],[1357,678,4],[1460,226,4],[1217,757,2],[1201,824,2]]
const starAssets = { 2: star2, 3: star3, 4: star4 }
const labMode = import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('heroLab') === '1'

export function HeroBackground() {
  const backgroundRef = useRef(null)
  const [desktopTarget, setDesktopTarget] = useState(null)
  const [mobileTarget, setMobileTarget] = useState(null)
  const preferences = useHeroMotionPreferences(backgroundRef)
  const [Atmosphere, setAtmosphere] = useState(null)
  const [Lab, setLab] = useState(null)
  const [labError, setLabError] = useState(null)
  useEffect(() => {
    if (!labMode) return
    let cancelled = false
    import('../effects/lab/HeroMotionLab').then(module => {
      if (!cancelled) setLab(() => module.default)
    }).catch(error => { if (!cancelled) setLabError(error.stack || error.message || String(error)) })
    return () => { cancelled = true }
  }, [])
  const [failed, setFailed] = useState(false)
  const [particlesReady, setParticlesReady] = useState(false)
  const particleStatus = useCallback(ready => setParticlesReady(ready), [])
  const fail = useCallback(() => setFailed(true), [])
  useEffect(() => {
    if (labMode || !preferences.active || failed) return
    let cancelled = false
    import('../effects/HeroAtmosphere').then(module => {
      if (!cancelled) setAtmosphere(() => module.default)
    }).catch(() => { if (!cancelled) fail() })
    return () => { cancelled = true }
  }, [preferences.active, failed, fail])
  return (
    <div className={`hero-background${preferences.active && !failed && particlesReady ? ' hero-atmosphere-active' : ''}`} aria-hidden="true" ref={backgroundRef}>
      <div className="hero-desktop-scene" ref={setDesktopTarget}>
        <picture><source media="(min-width: 1760px)" srcSet={productionWideBody} /><source media="(min-width: 1200px)" srcSet={productionBody} /><img className="horizon-desktop-body" src={desktopBody} alt="" width="1536" height="820" /></picture>
        {['tablet', 'production', 'wide'].map(variant => <HeroLightArc variant={variant} key={variant} />)}
        {stars.map(([x,y,size], index) => <img className="hero-star" src={starAssets[size]} key={`${x}:${y}`} alt="" width={size+14} height={size+14} style={{ '--tablet-star-x': `${x-7}px`, '--tablet-star-y': `${y-7}px`, '--production-star-x': `${productionStars[index][0]-7}px`, '--production-star-y': `${productionStars[index][1]-7}px` }} />)}
      </div>
      <div className="hero-mobile-horizon" ref={setMobileTarget}>
        <img className="horizon-mobile-body" src={mobileBody} alt="" width="390" height="98" />
        <HeroLightArc variant="mobile" />
      </div>
      {!labMode && preferences.active && !failed && Atmosphere && <Atmosphere backgroundRef={backgroundRef}
        {...preferences} arcTarget={preferences.tablet ? desktopTarget : mobileTarget} onParticleStatus={particleStatus} />}
      {labMode && Lab && <Lab backgroundRef={backgroundRef} preferences={preferences}
        arcTarget={preferences.tablet ? desktopTarget : mobileTarget} onParticleStatus={particleStatus} />}
      {labMode && !Lab && createPortal(<pre role="status" style={{ pointerEvents: 'auto', maxWidth: 'calc(100vw - 24px)', maxHeight: '70vh', overflow: 'auto', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', position: 'fixed', top: 90, right: 12, zIndex: 1000, color: 'white', background: 'black', padding: 16 }}>
        {labError ? `HERO LAB FAILED: ${labError}` : 'HERO LAB: LOADING'}
      </pre>, document.body)}
    </div>
  )
}
