import { useEffect, useRef, useContext } from 'react'
import { useIsomorphicLayoutEffect } from '../utils/hooks'
import { fetchData } from '../utils/functions'

import Cursor from '../components/Cursor'
import ModalStart from '../components/ModalStart'
import { CursorContext } from '../context/cursorContext'
import { modalVariant } from '../utils/framerVariantsHome'
import { useTransition } from '../context/transitionContext'

import styled from 'styled-components'
import { motion, useSpring } from 'framer-motion'

export default function Home({ modalData, randomArticleData, modalShow, setModalShow }) {
  const { slideTo } = useTransition()
  const handleStartClick = () => {
    setModalShow(false)
    slideTo('/agenda')
  }

  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  // Chevron effect
  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useIsomorphicLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest)
    })
  }, [spring])

  // Scroll to top on refresh
  useEffect(() => {
    function handleRefresh() {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleRefresh)
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [])

  return (
    <StyledContainer
      className="home-container"
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />
      <motion.div variants={modalVariant} animate={modalShow ? 'open' : 'closed'}>
        {modalData && <ModalStart handleStartClick={handleStartClick} modalData={modalData} />}
      </motion.div>
    </StyledContainer>
  )
}

export async function getServerSideProps() {
  const modalData = await fetchData('/modal').catch((e) => console.log(e))
  const randomArticleData = await fetchData('/random-article').catch((e) => console.log(e))

  return {
    props: {
      modalData: modalData?.data || {},
      randomArticleData: randomArticleData || {}
    }
  }
}

const StyledContainer = styled(motion.div)`
  /* 不再限制 100vh，內容可隨承認文字往下延伸 */
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #000;
  color: var(--main-color, #ffc93c);
  /* 為固定的 header 預留上方空間 */
  padding: 100px 20px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`
