import { useEffect, useRef } from 'react'
import { createSolutionHighlight, createFixedHeader } from '../utils/siteMotion'

export function useSolutionHighlight() {
  const rootRef = useRef(null)
  useEffect(() => createSolutionHighlight(rootRef.current), [])
  return rootRef
}

export function useFixedHeader() {
  const headerRef = useRef(null)
  const sentinelRef = useRef(null)
  useEffect(() => createFixedHeader(headerRef.current, sentinelRef.current), [])
  return { headerRef, sentinelRef }
}
