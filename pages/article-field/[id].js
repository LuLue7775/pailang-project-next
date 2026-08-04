import { useRef, useContext } from 'react'
import { useIsomorphicLayoutEffect } from '../../utils/hooks'
import { CursorContext } from '../../context/cursorContext'
import Cursor from '../../components/Cursor'
import ArticleFieldTemplate from '../../components/ArticleFieldTemplate'
import { fetchData } from '../../utils/functions'

import { motion, useSpring } from 'framer-motion'
import styled from 'styled-components'

export default function Field({ data }) {
  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useIsomorphicLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest)
    })
  }, [spring])

  return (
    <StyledContainer className="field-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />
      <ArticleFieldTemplate data={data} spring={spring} setHoverEvent={setHoverEvent} />
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id

  const data = await fetchData(`/article-field/${id}`).catch((err) => console.error(err))

  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking'
  }
}

const StyledContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  text-align: justify;
  height: auto;
`
