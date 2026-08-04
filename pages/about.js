import { useContext, useRef } from 'react'
import { fetchData, createMarkup } from '../utils/functions'
import Cursor from '../components/Cursor'
import { CursorContext } from '../context/cursorContext'

import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function About({ data }) {
  const { content, content_zh, credits } = data

  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent } = useContext(CursorContext)

  return (
    <StyledAbout className="about-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <StyledInner>
        {/* 標題 */}
        <StyledHero>
          <StyledEnHero className="font-title">Pailang Museum</StyledEnHero>
          <StyledZhHero>白浪博物館</StyledZhHero>
        </StyledHero>

        {/* 中文簡介 */}
        <StyledIntro
          className="zh"
          dangerouslySetInnerHTML={content_zh && createMarkup(content_zh, 'zh')}
        />

        {/* 英文簡介 */}
        <StyledIntro className="en" dangerouslySetInnerHTML={content && createMarkup(content, 'en')} />

        {/* Contact、Support */}
        {credits?.map((elem, i) => (
          <StyledCredit key={elem?.id ?? i}>
            <StyledDivider />
            <StyledCreditTitle className="font-title">{elem?.title}</StyledCreditTitle>
            <div className="en" dangerouslySetInnerHTML={elem?.content && createMarkup(elem?.content, 'en')} />
          </StyledCredit>
        ))}
      </StyledInner>
    </StyledAbout>
  )
}

export async function getServerSideProps() {
  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data: data?.data || {}
    }
  }
}

const StyledAbout = styled.div`
  /* 電腦版與行動版皆為直式單欄 */
  width: 100%;
  min-height: 100vh;
  padding: 90px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 配色照設計稿：黃底黑字 */
  background-color: var(--main-color, #ffc93c);
  color: #000;
`

const StyledInner = styled.div`
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
`

const StyledHero = styled.div`
  text-align: center;
  padding-bottom: 24px;
`

const StyledEnHero = styled.div`
  font-family: var(--title-font-en, serif);
  font-style: italic; 
  font-weight: 1000;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.1;
`

const StyledZhHero = styled.div`
  font-family: var(--main-font-zh, serif);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 600;
  padding-top: 8px;
`

const StyledIntro = styled.div`
  padding: 12px 0;
`

const StyledCredit = styled.div`
  padding-top: 24px;
`

const StyledDivider = styled.hr`
  border: none;
  border-top: 1px solid #000;
  /* full-bleed：突破置中容器，橫跨整個 viewport 寬度 */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-bottom: 16px;
`

const StyledCreditTitle = styled.div`
  font-family: var(--title-font-en, serif);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 8px 0 12px;
`
