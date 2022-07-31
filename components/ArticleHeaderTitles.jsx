import { useRef } from 'react'
import { useWindowSize } from '../utils/hooks'
import { createMarkup } from '../utils/functions'
import { subtitles } from '../utils/framerVariantsHeader'
import AnimatedTitles from './ArticleTitleAnimation'
import styled from 'styled-components'
import { motion } from 'framer-motion'
export default function ArticleHeaderTitles({ title, title_zh }) {
  const titleRef = useRef(title?.length > 60 ? true : false)
  const { windowWidth } = useWindowSize()

  return (
    <StyledTitles>
      <div>
        <AnimatedTitles
          title={title}
          language={'en'}
          textLengthRef={titleRef}
          windowWidth={windowWidth}
        />
      </div>
      <StyledZhTitles
        as={motion.div}
        variants={subtitles}
        initial="initial"
        animate="animate"
        dangerouslySetInnerHTML={title_zh && createMarkup(title_zh)}
      />
    </StyledTitles>
  )
}

const StyledTitles = styled.div`
  width: 100%;
  height: max(300px, 50vh);
  text-align: center;
  overflow: hidden;
`
const StyledZhTitles = styled(motion.div)`
  font-size: 1.3rem;
  p {
    font-size: 1.3rem;
  }
`
