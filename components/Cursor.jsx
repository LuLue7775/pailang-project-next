import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getRelativeCoordinates } from '../utils/functions'
import styled from 'styled-components'

const css = {
  box: {
    backgroundColor: 'linen',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    zIndex: '100'
  },
  fly: {
    position: 'absolute',
    width: '6px',
    height: '6px',
    margin: '-10px',
    backgroundColor: 'red',
    borderRadius: 10,
    zIndex: '100',
    pointerEvents: 'none'
  },
  circle: {
    position: 'absolute',
    margin: '-10px',
    backgroundColor: 'red',
    borderRadius: 10,
    zIndex: '100',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    border: '1px solid var(--main-color, #e0954f)',
    borderRadius: '40px',
    left: '-30px',
    top: '-30px'
  }
}

const circleAnimate = {
  default: (mousePosition) => {
    return {
      x: mousePosition.x,
      y: mousePosition.y
    }
  },
  expand: (mousePosition) => ({
    x: mousePosition.x,
    y: mousePosition.y,
    scale: 2,
    transition: { ease: [0.8, 0.01, -0.05, 0.95] }
  })
}

export default function Cursor({ hoverEvent, cursorAreaRef }) {
  const router = useRouter()

  const [mousePosition, setMousePosition] = useState({})

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition(getRelativeCoordinates(e.pageX, e.pageY, cursorAreaRef.current))
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  /**
   *  Cursor status
   */
  const [CircleAnimate, setCircleAnimate] = useState({})

  useEffect(() => {
    if (hoverEvent === 'default') setCircleAnimate({ ...circleAnimate.default(mousePosition) })
  }, [mousePosition])

  useEffect(() => {
    switch (hoverEvent) {
      case 'default':
        setCircleAnimate({ ...circleAnimate.default(mousePosition) })
        return
      case 'expand':
        setCircleAnimate({ ...circleAnimate.expand(mousePosition) })
        return
      default:
        return
    }
  }, [hoverEvent])

  return (
    <StyledContainer className="cursor-container" $route={router.pathname}>
      <motion.div
        style={css.fly}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
      />
      <motion.div style={css.circle} animate={CircleAnimate} />
      <motion.div
        style={{ ...css.fly, backgroundColor: 'gold' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ type: 'spring' }}
      />
      <motion.div
        style={{ ...css.fly, backgroundColor: 'orange' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ type: 'tween' }}
      />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: absolute;
  pointer-events: none;

  height: ${({ $route }) =>
    $route === '/agenda' || $route === '/about' ? 'calc(100vh - 80px)' : '200vh'};
  width: 100%;
  overflow: hidden;
`
