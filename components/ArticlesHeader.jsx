import { useContext } from 'react'
import { LineSVG, DownChevronSVG } from './Svgs'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'
import ArticleHeaderTitles from './ArticleHeaderTitles'
import ArticleHeaderSubtitles from './ArticleHeaderSubtitles'
import Image from 'next/image'

export default function ArticlesHeader({ data, slideTo, spring, hasChevron = true  }) {
  const { setHoverEvent } = useContext(CursorContext)
  return (
    <StyledHeader>
      <ArticleHeaderTitles title={data?.title} title_zh={data?.title_zh} />
      {data?.main_cover_image && (
        <StyledImageWrap>
          <Image
            src={`https://data.pailangmuseum.com/assets/${data?.main_cover_image}`}
            alt="cover image"
            width={640}
            height={350}
            layout="responsive"
            objectFit="contain"
          />
        </StyledImageWrap>
      )}

      <ArticleHeaderSubtitles
        artists={data?.artists}
        extra_info={data?.extra_info}
        start_date={data?.start_date}
        end_date={data?.end_date}
      />
      {
        hasChevron && (
          <div
            onClick={() => slideTo(document.getElementById('section2').offsetTop, spring)}
            onMouseOver={() => setHoverEvent('expand')}
            onMouseLeave={() => setHoverEvent('default')}>
            <DownChevronSVG />
          </div>
      )}
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
    max-height: 400px;
  }
`

const StyledHeader = styled.div`
  width: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 所有 article header 維持整頁高度。
     用 dvh（動態視窗高度）解決行動裝置、尤其 iOS Safari 下方網址列遮擋、以及各瀏覽器 100vh 不一致的問題；
     min-height 讓內容超過一屏時仍可撐開不被裁切；舊瀏覽器 fallback 到 vh。 */
  min-height: 100vh;
  min-height: 100dvh;
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
