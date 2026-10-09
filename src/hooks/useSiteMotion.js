import { useEffect, useRef } from 'react'
import { createEditorialMotion, createFixedHeader } from '../utils/siteMotion'

export function useEditorialMotion() {
  const rootRef = useRef(null)
  useEffect(() => createEditorialMotion(rootRef.current), [])
  return rootRef
}

export function useFixedHeader() {
  const headerRef = useRef(null)
  const sentinelRef = useRef(null)
  useEffect(() => createFixedHeader(headerRef.current, sentinelRef.current), [])
  return { headerRef, sentinelRef }
}
