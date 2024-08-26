import { useContext } from 'react'
import { LineSVG, DownChevronSVG } from './Svgs'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'
import ArticleHeaderTitles from './ArticleHeaderTitles'
import ArticleHeaderSubtitles from './ArticleHeaderSubtitles'
import Image from 'next/image'

export default function ArticlesHeader({ data, slideTo, spring }) {
  const { setHoverEvent } = useContext(CursorContext)
  return (
    <StyledHeader>
      <ArticleHeaderTitles title={data?.title} title_zh={data?.title_zh} />
      <StyledImageWrap>
        <Image
          src="/cover-test.jpg"
          alt="cover image"
          width={640}
          height={350}
          layout="responsive"
          objectFit="contain"
        />
      </StyledImageWrap>

      <ArticleHeaderSubtitles
        artists={data?.artists}
        extra_info={data?.extra_info}
        start_date={data?.start_date}
        end_date={data?.end_date}
      />
      <div
        onClick={() => slideTo(document.getElementById('section2').offsetTop, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}>
        <DownChevronSVG />
      </div>
    </StyledHeader>
  )
}
const StyledImageWrap = styled.div`
  max-width: min(90vw, 500px);
  position: relative;
  width: 100%;
  margin: 10px auto;
  overflow: hidden;
  @media (min-width: 768px) {
    max-height: 200px;
  }
`

const StyledHeader = styled.div`
  width: 100%;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: auto;
  @media (min-width: 768px) and (min-height: 600px) {
    height: 100vh;
  }
`

/**
 * now replaced by StyledAnimTitle. leave it here just for reference.
 */
// const StyledTitle = styled.h1`
//   line-height: 5rem;
//   font-size: ${({ $isTitleExceed, $windowWidth }) =>
//     $isTitleExceed ? `min(${((windowWidth / 20) * 100) / windowWidth}vw, 80px)` : 'min(8vw, 90px)'};
//   margin-bottom: 6px;
// `
// const StyledTitleZh = styled.h2`
//   line-height: 5rem;
//   font-size: ${({ $isTitleExceed, $windowWidth }) =>
//     $isTitleExceed ? `min(${((windowWidth / 60) * 100) / windowWidth}vw, 80px)` : 'min(2vw, 32px)'};
//   margin-bottom: 6px;
// `
