import { useRef, useContext, useLayoutEffect } from 'react'
import { CursorContext } from '../../context/cursorContext'
import { fetchData } from '../../utils/functions'
import Cursor from '../../components/Cursor'

import styled from 'styled-components'
import { motion, useSpring } from 'framer-motion'
import ArticleVideoTemplate from '../../components/ArticleVideoTemplate'

export default function Video({ data }) {
  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  // chevron
  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest)
    })
  }, [spring])

  return (
    <StyledContainer
      className="video-container"
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}
    >
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />
      <ArticleVideoTemplate data={data} spring={spring} setHoverEvent={setHoverEvent} />
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id

  const data = await fetchData(`/article-video/${id}`).catch((err) => console.error(err))
  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking'
  }
}

const StyledContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`
