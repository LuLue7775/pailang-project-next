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
  useEffect(() => {
    function handleResize() {
      router.reload(window.location.pathname)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <StyledAbout className="about-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <StyledAboutLeftCol>
        <AboutLeftElement roles={roles} createMarkup={createMarkup} />
      </StyledAboutLeftCol>

      <StyledAboutMidCol>
        <AboutMidElement content={content} content_zh={content_zh} createMarkup={createMarkup} />
      </StyledAboutMidCol>

      <StyledAboutRightCol>
        <AboutRightElement credits={credits} createMarkup={createMarkup} />
      </StyledAboutRightCol>
    </StyledAbout>
  )
}

export async function getStaticProps() {
  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 60
  }
}

const StyledAbout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: absolute;
  top: 0;
  padding-top: 80px;
  width: 100%;
  height: 100vh;
  color: #000;
  overflow: hidden;
  text-align: justify;
`

const StyledAboutLeftCol = styled(motion.div)`
  height: 100%;

`

const StyledAboutMidCol = styled(motion.div)`
  height: 100%;

`
const StyledAboutRightCol = styled(motion.div)`
  height: 100%;
  overflow-x: hidden;
`

const StyledSideLines = styled.div`
  position: absolute;

  width: calc(100vw / 16 * 6 * 0.96);
  height: 300px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`
