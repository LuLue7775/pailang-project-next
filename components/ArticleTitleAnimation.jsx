import { banner, letterAni } from '../utils/framerVariantsHeader'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AnimatedTitles({ title, language, textLengthRef, windowWidth }) {
  if (!title) return

  return (
    <StyledAnimTitle
      as={motion.span}
      className={`row-title ${language === 'zh' ? 'zh' : 'en'}`}
      variants={banner}
      initial="initial"
      animate="animate"
      $isTitleExceed={textLengthRef.current}
      $windowWidth={windowWidth}
      language={language}
    >
        <StyledAnimTitle
          as={motion.span}
          className="row-letter"
          $isTitleExceed={textLengthRef.current}
          $windowWidth={windowWidth}
          style={{
            fontFamily: language === 'zh' && 'Noto Serif TC',
            fontSize: language === 'zh' && '1.5rem',
            lineHeight: '7rem'
          }}
        >
          {title}
        </StyledAnimTitle>

      
      {/* staggering version
      {[...title].map((letter, i) => (
        <StyledAnimTitle
          as={motion.span}
          key={i}
          className="row-letter"
          variants={letterAni}
          $isTitleExceed={textLengthRef.current}
          $windowWidth={windowWidth}
          style={{
            fontFamily: language === 'zh' && 'Noto Serif TC',
            fontSize: language === 'zh' && '1.5rem'
          }}
        >
          {letter}
        </StyledAnimTitle>
      ))} */}
    </StyledAnimTitle>
  )
}

const StyledAnimTitle = styled(motion.span)`
  font-size: ${({ $isTitleExceed, $windowWidth }) =>
    $isTitleExceed
      ? `min(${(($windowWidth / 20) * 100) / windowWidth}vw, 80px)`
      : 'min(8vw, 90px)'};
  line-height: 5rem;
  font-weight: 500;
  margin-bottom: 6px;
  position: relative;
  display: inline-block;

`
