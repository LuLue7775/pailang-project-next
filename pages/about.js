import { useEffect, useContext, useRef } from 'react'
import AboutLeftElement from '../components/AboutLeftElement'
import AboutMidElement from '../components/AboutMidElement'
import AboutRightElement from '../components/AboutRightElement'
import { fetchData, createMarkup } from '../utils/functions'
import Cursor from '../components/Cursor'
import { CursorContext } from '../context/cursorContext'

import { useRouter } from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function About({ data }) {
  const { content, content_zh, credits, roles } = data
  const router = useRouter()

  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent } = useContext(CursorContext)

  // force refresh to recalculate
  // useEffect(() => {
  //   function handleResize() {
  //     router.reload(window.location.pathname)
  //   }

  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  return (
    <StyledAbout className="about-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <StyledAboutCol $order={2}>
        <AboutLeftElement roles={roles} createMarkup={createMarkup} />
      </StyledAboutCol>

      <StyledAboutCol $order={1}>
        <AboutMidElement content={content} content_zh={content_zh} createMarkup={createMarkup} />
      </StyledAboutCol>

      <StyledAboutCol $order={3}>
        <AboutRightElement credits={credits} createMarkup={createMarkup} />
      </StyledAboutCol>
    </StyledAbout>
  )
}

export async function getStaticProps() {
  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 1
  }
}

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  color: #000;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 100vh;
  }
`

const StyledAboutCol = styled.div`
  flex: 1;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 15px;

  @media (max-width: 767px) {
    order: ${({ $order }) => $order};
  }

  @media (max-width: 767px) {
    height: auto;
    min-height: 33vh;
  }
`

// const StyledAboutLeftCol = styled(motion.div)`
//   height: 100%;
// `

// const StyledAboutMidCol = styled(motion.div)`
//   height: 100%;
// `
// const StyledAboutRightCol = styled(motion.div)`
//   height: 100%;
//   overflow-x: hidden;
// `

const StyledSideLines = styled.div`
  position: absolute;

  width: calc(100vw / 16 * 6 * 0.96);
  height: 300px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`
