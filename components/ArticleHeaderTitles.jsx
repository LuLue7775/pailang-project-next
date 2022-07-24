import { useRef } from 'react'
import { useWindowSize } from '../utils/hooks'
import AnimatedTitles from "./ArticleTitleAnimation"
import styled from 'styled-components'

export default function ArticleHeaderTitles({ title, title_zh }) {
    const titleRef = useRef(title?.length > 60 ? true : false)
    const titleZhRef = useRef(title_zh?.length > 40 ? true : false)
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
        <div>
          <AnimatedTitles
            title={title_zh}
            language={'zh'}
            textLengthRef={titleZhRef}
            windowWidth={windowWidth}
          />
        </div>
    </StyledTitles>
  )
}


/**
 * @TODO media query on height and fontsize
 */
 const StyledTitles = styled.div`
 text-align: center;
 height: max(300px, 50vh);
 overflow: hidden;
 width: 100%;
`