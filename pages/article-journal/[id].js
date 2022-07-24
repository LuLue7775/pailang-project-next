import { useRef, useLayoutEffect, useState, useContext } from 'react'
import { CursorContext } from '../../context/cursorContext'
import { fetchData } from '../../utils/functions'
import Cursor from '../../components/Cursor'
import ArticleJorunalTemplate from '../../components/ArticleJournalTemplate'

import styled from 'styled-components'
import { motion, useSpring } from 'framer-motion'

export default function Journal({ data }) {
  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  // Chevron effect
  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest)
    })
  }, [spring])

  return (
    <StyledContainer
      className="journal-container"
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}
    >
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <ArticleJorunalTemplate data={data} spring={spring} setHoverEvent={setHoverEvent} />
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id

  const data = await fetchData(`/article-journal/${id}`).catch((err) => console.error(err))

  return {
    props: {
      data: data?.data || ''
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }, { params: { id: '4' } }],
    fallback: 'blocking'
  }
}

const StyledContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`
/**
 * @TODO media query on height and fontsize
 */
const StyledTitles = styled.div`
  text-align: center;
  height: 55vh;
`
const StyledSubtitles = styled.div`
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 30% 30% 30% 1fr;
  justify-items: center;
  align-items: center;
`
