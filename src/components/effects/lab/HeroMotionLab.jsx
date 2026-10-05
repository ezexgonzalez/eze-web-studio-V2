import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LabParticles } from './LabParticles'
import { LabArc } from './LabArc'
import { LabHaloQuality } from './LabHaloQuality'
import { LabBoundary } from './LabBoundary'
import { particleProof, arcProof, particleControls, arcControls, haloQualityProof, haloQualityControls, wakeProof, wakeControls } from './labSettings'
import './hero-lab.css'

function environment() {
  return { width: window.innerWidth, height: window.innerHeight, reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches, hidden: document.hidden }
}

function Controls({ title, definitions, settings, onChange }) {
  return <fieldset><legend>{title}</legend>{definitions.map(([key, label, min, max, step]) =>
    <label key={key}>{label}: <output>{settings[key]}</output>
      <input type="range" min={min} max={max} step={step} value={settings[key]} onChange={event => onChange(current => ({ ...current, [key]: Number(event.target.value) }))} />
    </label>)}</fieldset>
}

export default function HeroMotionLab({ backgroundRef, preferences, arcTarget, onParticleStatus }) {
  const [env, setEnvironment] = useState(environment)
  const [particles, setParticles] = useState(particleProof)
  const [arc, setArc] = useState(arcProof)
  const [haloQuality, setHaloQuality] = useState(haloQualityProof)
  const [wake, setWake] = useState(wakeProof)
  const [wakeTelemetry, setWakeTelemetry] = useState('No wakes triggered')
  const [particleStatus, setParticleStatus] = useState('LOADING')
  const [arcStatus, setArcStatus] = useState('LOADING')
  const [pointer, setPointer] = useState(false)
  const [errors, setErrors] = useState([])
  const [telemetry, setTelemetry] = useState(null)
  const [arcTelemetry, setArcTelemetry] = useState('')
  const [exported, setExported] = useState('')
  const [confirmed, setConfirmed] = useState({ rest: false, held: false, return: false, wake: false, fade: false })
  const [revision, setRevision] = useState(0)
  const report = useCallback((system, error) => {
    const detail = error?.stack || error?.message || String(error)
    setErrors(current => current.some(item => item.system === system && item.detail === detail) ? current : [...current.slice(-9), { system, detail }])
    if (system === 'PARTICLES') setParticleStatus('FAILED')
    if (system === 'ARC') setArcStatus('FAILED')
  }, [])
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnvironment(environment())
    const rejection = event => report('PARTICLES', event.reason || new Error('Unhandled promise rejection'))
    const exception = event => report('RUNTIME', event.error || new Error(`${event.message} at ${event.filename}:${event.lineno}`))
    window.addEventListener('resize', update)
    reduced.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    window.addEventListener('error', exception)
    window.addEventListener('unhandledrejection', rejection)
    return () => {
      window.removeEventListener('resize', update)
      reduced.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('error', exception)
      window.removeEventListener('unhandledrejection', rejection)
    }
  }, [report])
  const active = preferences.active && !env.reduced && !env.hidden
  const variant = preferences.tablet ? (preferences.desktop ? (preferences.wide ? 'wide' : 'production') : 'tablet') : 'mobile'
  const failedParticles = errors.some(error => error.system === 'PARTICLES' || error.system === 'RUNTIME')
  const failedArc = errors.some(error => error.system === 'ARC' || error.system === 'RUNTIME')
  const blocked = env.reduced ? 'prefers-reduced-motion' : env.hidden ? 'document hidden' : typeof IntersectionObserver === 'undefined' ? 'IntersectionObserver unavailable' : 'Hero outside viewport / waiting for visibility'
  const reset = () => {
    setParticles(particleProof); setArc(arcProof); setHaloQuality(haloQualityProof); setWake(wakeProof); setWakeTelemetry('No wakes triggered'); setErrors([]); setTelemetry(null); setArcTelemetry('')
    setParticleStatus('LOADING'); setArcStatus('LOADING'); setPointer(false)
    setConfirmed({ rest: false, held: false, return: false, wake: false, fade: false })
    setExported(''); setRevision(value => value + 1)
  }
  const proofComplete = Object.values(confirmed).every(Boolean)
  const panel = <aside className="hero-lab-panel" aria-label="Hero motion diagnostic lab">
    <h2>HERO MOTION LAB PHASE 2 — DEV ONLY</h2>
    <p>Baseline exportado por Eze. Reposo limpio; calidad y wake todavía en prueba.</p>
    <dl aria-live="polite">
      <dt>PARTICLES</dt><dd>{failedParticles ? 'FAILED' : active ? particleStatus : 'PAUSED'}</dd>
      <dt>ARC</dt><dd>{failedArc ? 'FAILED' : active ? arcStatus : 'PAUSED'}</dd>
      <dt>POINTER</dt><dd>{active && pointer && !failedArc ? 'ACTIVE' : 'INACTIVE'}</dd>
      <dt>REDUCED MOTION</dt><dd>{env.reduced ? 'ON' : 'OFF'}</dd>
      <dt>VIEWPORT</dt><dd>{env.width} × {env.height}</dd>
    </dl>
    {!active && <p role="status">Efectos detenidos: {blocked}. No se anula reduced motion.</p>}
    <p>SVG displacement constructor: {typeof window.SVGFEDisplacementMapElement === 'undefined' ? 'unavailable (08D feature gate would stop)' : 'available'}. DOM filter support is tested separately.</p>
    <p>Arc variant: {variant}. Hover: {preferences.interactive ? 'enabled' : 'unavailable (requires Desktop + fine hover pointer)'}.</p>
    {telemetry && <p>Canvas: {telemetry.canvas}; DPR {telemetry.dpr}; count {telemetry.count}; max travel/0.5s {telemetry.travel}px.</p>}
    {arcTelemetry && <p>Arc scales / noise frequency: {arcTelemetry}. Cambios de atributos no prueban apariencia visual.</p>}
    <p>RUNNING indica runtime activo; la prueba visual la confirmás vos.</p>
    <details open={errors.length > 0}><summary>Errores ({errors.length})</summary>{errors.map((error, index) => <pre key={index}>{error.system}: {error.detail}</pre>)}{!errors.length && <p>Sin errores capturados.</p>}</details>
    <fieldset><legend>Confirmación visual — Eze</legend>
      {Object.entries({ rest: 'Reposo limpio', held: 'Pointer lento deforma localmente', return: 'Al salir vuelve suavemente', wake: 'Swipe rápido abre y empuja niebla en su dirección', fade: 'Al detenerme el wake se disipa' }).map(([key, label]) =>
        <label key={key}><input type="checkbox" checked={confirmed[key]} onChange={event => setConfirmed(current => ({ ...current, [key]: event.target.checked }))} /> {label}</label>)}
    </fieldset>
    <p>{proofComplete ? 'Proof confirmado por Eze. Podés ajustar y exportar; producción no se modifica.' : 'Verificá las cinco condiciones de Phase 2. Particle drift sigue NO confirmado por Eze.'}</p>
    <p>Baseline real browser: render YES; particle repulse YES; arc runtime YES; held deformation YES; particle drift NO. 1920 × 945.</p>
    <p>VELOCITY WAKE: {active && preferences.interactive && wake.enabled ? wakeTelemetry : 'INACTIVE'}</p>
    <Controls title="PARTICLES" definitions={particleControls} settings={particles} onChange={setParticles} />
    <Controls title="ARC" definitions={arcControls} settings={arc} onChange={setArc} />
    <Controls title="HALO QUALITY" definitions={haloQualityControls} settings={haloQuality} onChange={setHaloQuality} />
    <fieldset><legend>VELOCITY WAKE</legend><label><input type="checkbox" checked={wake.enabled} onChange={event => setWake(current => ({ ...current, enabled: event.target.checked }))} /> Enabled</label></fieldset>
    <Controls title="VELOCITY WAKE VALUES" definitions={wakeControls} settings={wake} onChange={setWake} />
    <button type="button" onClick={reset}>Reset Eze baseline / retry</button>
    <button type="button" onClick={() => setExported(JSON.stringify({ block: '08F', particles, arc, haloQuality, wake, confirmed, viewport: [env.width, env.height], reducedMotion: env.reduced }, null, 2))}>Exportar valores</button>
    <button type="button" onClick={() => window.location.reload()}>Recargar Lab</button>
    {exported && <label>Copiá este JSON para el próximo pass<textarea readOnly value={exported} rows={12} onFocus={event => event.target.select()} /></label>}
    <a href={window.location.pathname}>Salir del Lab</a>
  </aside>
  return <>
    <LabHaloQuality target={arcTarget} variant={variant} settings={haloQuality} onError={report} />
    {active && !failedParticles && <LabBoundary system="PARTICLES" onError={report} key={`particles-${revision}`}>
      <LabParticles key={JSON.stringify(particles)} settings={particles} interactive={preferences.interactive}
        onStatus={setParticleStatus} onError={report} onTelemetry={setTelemetry} onReady={onParticleStatus} />
    </LabBoundary>}
    {active && !failedArc && <LabBoundary system="ARC" onError={report} key={`arc-${revision}`}>
      <LabArc target={arcTarget} variant={variant} backgroundRef={backgroundRef} interactive={preferences.interactive}
        settings={arc} quality={haloQuality} wakeSettings={wake} onWakeTelemetry={setWakeTelemetry} onStatus={setArcStatus} onError={report} onPointer={setPointer} onTelemetry={setArcTelemetry} />
    </LabBoundary>}
    {createPortal(panel, document.body)}
  </>
}
