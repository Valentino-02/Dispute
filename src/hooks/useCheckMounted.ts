'use client'

import { useEffect, useState } from 'react'

// To prevent hidration errors
export default function useCheckMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
