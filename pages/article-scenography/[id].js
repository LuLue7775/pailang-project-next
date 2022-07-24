import { useLayoutEffect, useRef, useState, useContext, useEffect } from 'react'
import { CursorContext } from '../../context/cursorContext'
import Cursor from '../../components/Cursor'
import ArticleScenographyTemplate from '../../components/ArticleScenographyTemplate'
import { fetchData } from '../../utils/functions'

import { motion, useSpring } from 'framer-motion'
import styled from 'styled-components'

export default function Scenography({ data }) {
  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest)
    })
  }, [spring])

  return (
    <StyledContainer
      className="scenography-container"
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}
    >
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <ArticleScenographyTemplate data={data} spring={spring} setHoverEvent={setHoverEvent} />
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id

  const data = await fetchData(`/article-scenography/${id}`).catch((err) => console.error(err))

  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
      { params: { id: '5' } },
      { params: { id: '6' } }
    ],
    fallback: 'blocking'
  }
}

const StyledContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`
