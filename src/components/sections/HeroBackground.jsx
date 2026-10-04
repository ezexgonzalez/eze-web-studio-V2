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
import productionGlow from '../../assets/hero/production-glow.svg'
import productionBody from '../../assets/hero/production-body.svg'
import productionRim from '../../assets/hero/production-rim.svg'
import productionWideGlow from '../../assets/hero/production-wide-glow.svg'
import productionWideBody from '../../assets/hero/production-wide-body.svg'
import productionWideRim from '../../assets/hero/production-wide-rim.svg'
const productionStars = [[132,202],[152,336],[218,465],[302,690],[843,286],[1120,196],[1275,678],[1374,218],[1138,760],[1122,818]]
const stars = [[144,216,3],[166,354,4],[237,482,4],[328,694,3],[901,292,3],[1193,206,3],[1357,678,4],[1460,226,4],[1217,757,2],[1201,824,2]]
const starAssets = { 2: star2, 3: star3, 4: star4 }
export function HeroBackground() {
  const backgroundRef = useRef(null)
  useHorizonGlow(backgroundRef)
  return (
    <div className="hero-background" aria-hidden="true" ref={backgroundRef}>
      <div className="hero-desktop-scene">
        <picture><source media="(min-width: 1760px)" srcSet={productionWideGlow} /><source media="(min-width: 1200px)" srcSet={productionGlow} /><img className="horizon-desktop-glow" src={desktopGlow} alt="" width="1536" height="842" /></picture>
        <picture><source media="(min-width: 1760px)" srcSet={productionWideBody} /><source media="(min-width: 1200px)" srcSet={productionBody} /><img className="horizon-desktop-body" src={desktopBody} alt="" width="1536" height="820" /></picture>
        <picture><source media="(min-width: 1760px)" srcSet={productionWideRim} /><source media="(min-width: 1200px)" srcSet={productionRim} /><img className="horizon-desktop-rim" src={desktopRim} alt="" width="1536" height="839" /></picture>
        {stars.map(([x,y,size], index) => <img className="hero-star" src={starAssets[size]} key={`${x}:${y}`} alt="" width={size+14} height={size+14} style={{ '--tablet-star-x': `${x-7}px`, '--tablet-star-y': `${y-7}px`, '--production-star-x': `${productionStars[index][0]-7}px`, '--production-star-y': `${productionStars[index][1]-7}px` }} />)}
      </div>
      <div className="hero-mobile-horizon">
        <img className="horizon-mobile-glow" src={mobileGlow} alt="" width="390" height="128" />
        <img className="horizon-mobile-body" src={mobileBody} alt="" width="390" height="98" />
        <img className="horizon-mobile-rim" src={mobileRim} alt="" width="390" height="118" />
      </div>
    </div>
  )
}
