import { createContext, useContext, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export const TransitionContext = createContext({ slideTo: () => {} })
export const useTransition = () => useContext(TransitionContext)

const EASE = [0.8, 0.01, 0.2, 1]

export default function TransitionProvider({ children }) {
  const router = useRouter()
  const controls = useAnimation()
  const [pending, setPending] = useState(null)

  // 點擊 Start / ABOUT / AGENDA 時，整頁由下往上滑入覆蓋，動畫結束後再導頁
  const slideTo = async (href) => {
    if (!href || href === router.pathname) return
    setPending(href)
    await controls.start({ y: '0%', transition: { duration: 0.6, ease: EASE } })
    router.push(href)
  }

  // 新頁面載入完成後，覆蓋層再往上滑出、露出主站
  useEffect(() => {
    const handleComplete = async () => {
      if (!pending) return
      await controls.start({ y: '-100%', transition: { duration: 0.6, ease: EASE } })
      controls.set({ y: '100%' })
      setPending(null)
    }
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [pending, controls, router.events])

  return (
    <TransitionContext.Provider value={{ slideTo }}>
      {children}
      <StyledOverlay
        as={motion.div}
        className="page-transition-overlay"
        initial={{ y: '100%' }}
        animate={controls}
        aria-hidden
      />
    </TransitionContext.Provider>
  )
}

const StyledOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--main-color, #ffc93c);
  pointer-events: none;
  will-change: transform;
`
