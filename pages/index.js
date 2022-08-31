import { useEffect, useRef, useContext } from 'react'
import { useIsomorphicLayoutEffect } from '../utils/hooks'
import { fetchData } from '../utils/functions'

import Cover from '../components/Cover'
import Cursor from '../components/Cursor'
import ModalStart from '../components/ModalStart'
import HomeArticle from '../components/HomeArticle'
import { CursorContext } from '../context/cursorContext'
import { modalVariant } from '../utils/framerVariantsHome'
import { HomeArticleTypeContext } from '../context/homeArticleTypeContext'

import Image from 'next/image'
import styled from 'styled-components'
import { motion, useSpring } from 'framer-motion'

export default function Home({ modalData, randomArticleData, modalShow, setModalShow }) {
  const { setCurrentArticle } = useContext(HomeArticleTypeContext)
  useEffect(() => {
    setCurrentArticle(randomArticleData.type)
  }, [randomArticleData])

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
      ref={cursorAreaRef}
    >
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />
      <Cover modalShow={modalShow}>
        <Image src="/homeBG.jpg" alt="gradient" height="100vh" width="100vw" layout="fill" />
        <motion.div variants={modalVariant} animate={modalShow ? 'open' : 'closed'}>
          {modalData && <ModalStart setModalShow={setModalShow} modalData={modalData} />}
        </motion.div>
      </Cover>

      {/** @TODO fix rerendering */}
      <HomeArticle
        randomArticleData={randomArticleData}
        spring={spring}
        setHoverEvent={setHoverEvent}
      />
    </StyledContainer>
  )
}

export async function getStaticProps() {
  const modalData = await fetchData('/modal').catch((e) => console.log(e))
  const randomArticleData = await fetchData('/random-article').catch((e) => console.log(e))

  return {
    props: {
      modalData: modalData?.data || {},
      randomArticleData: randomArticleData || {}
    },
    revalidate: 60
  }
}

const StyledContainer = styled(motion.div)`
  height: 200vh;
  width: 100%;
  overflow: hidden;

  perspective: 600;
`
