import { useContext, useEffect, useLayoutEffect, useState, useRef } from 'react'
import { LeftCrossSVG, RightCrossSVG, LineSVG, DownChevronSVG } from './Svgs'
import styled from 'styled-components'
import { CursorContext } from '../context/cursorContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowSize } from '../utils/hooks'

const banner = {
  animate: {
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.007
    }
  }
}

const letterAni = {
  initial: { y: 600 },
  animate: (i) => ({
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1
    }
  })
}

const subtitles = {
  initial: { opacity: 0 },

  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delay: 1.5
    }
  }
}

const AnimatedTitles = ({ title, language, textLengthRef, windowWidth }) => {
  if (!title) return

  return (
    <StyledAnimTitle
      as={motion.span}
      className={`row-title ${language === 'zh' ? 'zh' : ''}`}
      variants={banner}
      initial="initial"
      animate="animate"
      isTitleExceed={textLengthRef.current}
      windowWidth={windowWidth}
      language={language}
    >
      {[...title].map((letter, i) => (
        <StyledAnimTitle
          as={motion.span}
          key={i}
          className="row-letter"
          variants={letterAni}
          isTitleExceed={textLengthRef.current}
          windowWidth={windowWidth}
          style={{
            fontFamily: language === 'zh' && 'Noto Serif TC',
            fontSize: language === 'zh' && '1.5rem'
          }}
        >
          {letter}
        </StyledAnimTitle>
      ))}
    </StyledAnimTitle>
  )
}

export default function ArticlesHeader({ data, slideTo, spring }) {
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)
  const titleRef = useRef(data?.title?.length > 60 ? true : false)
  const titleZhRef = useRef(data?.title_zh?.length > 40 ? true : false)
  const { windowWidth } = useWindowSize()

  return (
    <StyledHeader>
      <LineSVG />
      <StyledTitles>
        <div>
          <AnimatedTitles
            title={data?.title}
            language={'en'}
            textLengthRef={titleRef}
            $windowWidth={windowWidth}
          />
        </div>
        <div>
          <AnimatedTitles
            title={data?.title_zh}
            language={'zh'}
            textLengthRef={titleZhRef}
            $windowWidth={windowWidth}
          />
        </div>
        {/* <StyledTitle isTitleExceed={titleRef.current} windowWidth={windowWidth}>
                { data?.title }
            </StyledTitle> */}
        {/* <StyledTitleZh isTitleExceed={titleZhRef.current} windowWidth={windowWidth}>
                { data?.title_zh }
            </StyledTitleZh> */}
      </StyledTitles>

      <StyledSubtitlesWrap className="zh">
        <LeftCrossSVG />
        <StyledSubtitles as={motion.div} variants={subtitles} initial="initial" animate="animate">
          <div> {data?.artist} </div>
          <div>
            <div> {data?.producer && `製作單位 Produced by ${data?.producer} `} </div>
            <div> {data?.curator && `策展 Curated by ${data?.curator}`} </div>
          </div>
          <div>
            <div> {data?.start_date} </div>
            <div> | </div>
            <div> {data?.start_date} </div>
          </div>
        </StyledSubtitles>
        <RightCrossSVG />
      </StyledSubtitlesWrap>

      <div
        onClick={() => slideTo(document.getElementById('section2').offsetTop, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}
      >
        <DownChevronSVG />
      </div>
    </StyledHeader>
  )
}

const StyledAnimTitle = styled(motion.span)`
  font-size: ${({ isTitleExceed, windowWidth }) =>
    isTitleExceed ? `min(${((windowWidth / 20) * 100) / windowWidth}vw, 80px)` : 'min(8vw, 90px)'};
  line-height: 5rem;
  font-weight: 500;
  margin-bottom: 6px;
  position: relative;
  display: inline-block;

  // @media (max-width: $layout-breakpoint-xsmall) {
  //   font-size: 13rem;
  // }

  // font-family: ${({ language }) =>
    language === 'en' ? 'var( --title-font-en, serif);' : '"Noto Serif TC", serif);'}
`

const StyledHeader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

/**
 * @TODO media query on height and fontsize
 */
const StyledTitles = styled.div`
  text-align: center;
  height: max(300px, 50vh);
  overflow: hidden;
  width: 100%;
`
const StyledTitle = styled.h1`
  line-height: 5rem;
  font-size: ${({ isTitleExceed, windowWidth }) =>
    isTitleExceed ? `min(${((windowWidth / 20) * 100) / windowWidth}vw, 80px)` : 'min(8vw, 90px)'};
  margin-bottom: 6px;
`
const StyledTitleZh = styled.h2`
  line-height: 5rem;
  font-size: ${({ isTitleExceed, windowWidth }) =>
    isTitleExceed ? `min(${((windowWidth / 60) * 100) / windowWidth}vw, 80px)` : 'min(2vw, 32px)'};
  margin-bottom: 6px;
`

const StyledSubtitlesWrap = styled.div`
  width: 100%;
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 75% 1fr;
  justify-items: center;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  text-align: center;
`
const StyledSubtitles = styled(motion.div)`
  width: 100%;
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
`
