import { banner } from '../utils/framerVariantsHeader'
import { createMarkup } from '../utils/functions'
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
      language={language}>
      <StyledAnimTitle
        as={motion.span}
        className="row-letter font-ogg header1"
        $isTitleExceed={textLengthRef.current}
        $windowWidth={windowWidth}
        dangerouslySetInnerHTML={title && createMarkup(title, 'en')}
      />

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
  font-weight: 500;
  margin-bottom: 0.5em;
  position: relative;
  display: inline-block;

  p {
    padding: 0 10px;
    font-size: clamp(24px, 7vw, 40px);
    line-height: clamp(1.4em, 6vw, 1.3em);

    @media (min-width: 480px) {
      font-size: clamp(20px, 7vw, 50px);
      line-height: clamp(1.2em, 8vw, 1.5em);
    }

    ${({ $isTitleExceed, $windowWidth }) =>
      $isTitleExceed &&
      `
    font-size: clamp(20px, ${(($windowWidth / 20) * 110) / $windowWidth}vw, 30px);
    line-height: clamp(1.2em, ${(($windowWidth / 20) * 110) / $windowWidth}vw, 1.5em);
  `}
  }
`