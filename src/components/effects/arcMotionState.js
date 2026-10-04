// Independent rates avoid a single, easily recognisable breathing loop.
export function arcMotionState(seconds, width, mobile) {
  const t = seconds * (mobile ? .72 : 1)
  return {
    energyX: width * (.24 * Math.sin(t * .29) + .075 * Math.sin(t * .47)),
    mistX: (mobile ? 2.5 : 6) * Math.sin(t * .53),
    mistY: (mobile ? 2 : 4) * Math.sin(t * .37),
    haloY: (mobile ? 1 : 2.5) * Math.sin(t * .61),
    intensity: .9 + .085 * Math.sin(t * .73) + .025 * Math.sin(t * .31),
    shimmer: i => .86 + .14 * Math.cos(t * .87 - i * 1.15),
  }
}
