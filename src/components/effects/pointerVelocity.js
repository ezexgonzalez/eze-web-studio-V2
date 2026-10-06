// Speed is measured in CSS px/ms; direction is separately mapped into SVG space.
export function createVelocityTracker() {
  let previous
  return {
    reset() { previous = undefined },
    sample(event, point) {
      const current = { x: event.clientX, y: event.clientY, time: event.timeStamp, point }
      const last = previous
      previous = current
      const dt = last ? current.time - last.time : 0
      if (dt <= 0 || dt > 150) return null
      const vx = (current.x - last.x) / dt
      const vy = (current.y - last.y) / dt
      const dx = point.x - last.point.x
      const dy = point.y - last.point.y
      const length = Math.hypot(dx, dy)
      return length ? { speed: Math.hypot(vx, vy), x: dx / length, y: dy / length } : null
    },
  }
}

