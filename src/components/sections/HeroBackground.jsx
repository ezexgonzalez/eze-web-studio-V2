import { useRef } from 'react'
import { useHorizonGlow } from '../../hooks/useHorizonGlow'
import desktopGlow from '../../assets/hero/desktop-glow.svg'
import desktopBody from '../../assets/hero/desktop-body.svg'
import desktopRim from '../../assets/hero/desktop-rim.svg'
import mobileGlow from '../../assets/hero/mobile-glow.svg'
import mobileBody from '../../assets/hero/mobile-body.svg'
import mobileRim from '../../assets/hero/mobile-rim.svg'
import star2 from '../../assets/hero/star-2.svg'
import star3 from '../../assets/hero/star-3.svg'
import star4 from '../../assets/hero/star-4.svg'
const stars = [[144,216,3],[166,354,4],[237,482,4],[328,694,3],[901,292,3],[1193,206,3],[1357,678,4],[1460,226,4],[1217,757,2],[1201,824,2]]
const starAssets = { 2: star2, 3: star3, 4: star4 }
export function HeroBackground() {
  const backgroundRef = useRef(null)
  useHorizonGlow(backgroundRef)
  return (
    <div className="hero-background" aria-hidden="true" ref={backgroundRef}>
      <div className="hero-desktop-scene">
        <img className="horizon-desktop-glow" src={desktopGlow} alt="" width="1536" height="842" />
        <img className="horizon-desktop-body" src={desktopBody} alt="" width="1536" height="820" />
        <img className="horizon-desktop-rim" src={desktopRim} alt="" width="1536" height="839" />
        <div className="hero-grid hero-grid-desktop">
          {Array.from({ length: 15 }, (_, i) => <i key={`v${i}`} style={{ left: `${Math.floor(i * 108.5)}px` }} />)}
          {Array.from({ length: 7 }, (_, i) => <b key={`h${i}`} style={{ top: `${100 + i * 128}px` }} />)}
        </div>
        {stars.map(([x,y,size]) => <img className="hero-star" src={starAssets[size]} key={`${x}:${y}`} alt="" width={size+14} height={size+14} style={{ left:x-7, top:y-7 }} />)}
      </div>
      <div className="hero-mobile-horizon">
        <img className="horizon-mobile-glow" src={mobileGlow} alt="" width="390" height="128" />
        <img className="horizon-mobile-body" src={mobileBody} alt="" width="390" height="98" />
        <img className="horizon-mobile-rim" src={mobileRim} alt="" width="390" height="118" />
      </div>
      <div className="hero-grid hero-grid-mobile"><i /><i /><i />
        {Array.from({ length: 5 }, (_, i) => <b key={i} style={{ top:108+i*168 }} />)}
      </div>
    </div>
  )
}
