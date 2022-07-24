import { useContext } from 'react'
import { LineSVG, DownChevronSVG } from './Svgs'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'
import ArticleHeaderTitles from './ArticleHeaderTitles'
import ArticleHeaderSubtitles from './ArticleHeaderSubtitles'

export default function ArticlesHeader({ data, slideTo, spring }) {
  const { setHoverEvent } = useContext(CursorContext)

  return (
    <StyledHeader>
      <LineSVG />
      <ArticleHeaderTitles title={data?.title} title_zh={data?.title_zh}/>
      <ArticleHeaderSubtitles 
        artist={data?.artist} 
        producer={data?.producer} 
        curator={data?.curator}
        start_date={data?.start_date} 
        end_date={data?.end_date}
      />
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


const StyledHeader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

/**
 * now replaced by StyledAnimTitle. leave it here just for reference.
 */
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
