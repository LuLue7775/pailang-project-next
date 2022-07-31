import { useRef } from 'react'
import { UpChevronSVG } from './Svgs'
import VideoPlayer from './VideoPlayer'
import { motion } from 'framer-motion'
import { slideTo, createMarkup } from '../utils/functions'
import ArticlesHeader from './ArticlesHeader'
import { useMediaQuery } from '../utils/hooks'
import styled from 'styled-components'

export default function ArticleVideoTemplate({ data, spring, setHoverEvent }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const videoPlayerRef = useRef(null)

  return (
    <>
      <ArticlesHeader data={data} slideTo={slideTo} spring={spring} />

      <StyledChevron
        onClick={() => slideTo(0, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}
      >
        <UpChevronSVG />
      </StyledChevron>

      <StyledVideo id="section2" $isMobile={isMobile}>
        <StyledLeftCol
          className="left-col en"
          $isMobile={isMobile}
          as={motion.div}
          initial={{ x: '-100%', y: '200px' }}
          animate={{ x: 0, y: 0 }}
          exit={{ y: '200px' }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 100,
            duration: 3,
            ease: 'easeInOut'
          }}
        >
          <StyledVideoContainer>
            {data?.video ? (
              <VideoPlayer ref={videoPlayerRef} video={data?.video} />
            ) : (
              <StyledVideoNotifier>
                <div className="en">
                  {' '}
                  This work is no longer on view. Please scroll down for an introduction to the film
                  or contact us through the About page if you require further information.
                </div>
                <div className="zh">
                  {' '}
                  本件作品已過展期。如需更多訊息，請向下滾動查閱影片介紹，或通過關於頁面與我們聯繫。{' '}
                </div>
              </StyledVideoNotifier>
            )}
          </StyledVideoContainer>

          <StyledLeftText
            className="left-text"
            dangerouslySetInnerHTML={data?.description && createMarkup(data?.description)}
          />

          <StyledFooter
            className="author-bio"
            dangerouslySetInnerHTML={data?.author_bio && createMarkup(data?.author_bio)}
          />
        </StyledLeftCol>

        <StyledRightCol
          className="right-col ch"
          as={motion.div}
          initial={{ x: '100%', y: '200px' }}
          animate={{ x: 0, y: 0 }}
          exit={{ y: '200px' }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 100,
            duration: 3,
            ease: 'easeInOut'
          }}
          dangerouslySetInnerHTML={data?.content && createMarkup(data?.content)}
        />
      </StyledVideo>
    </>
  )
}

const StyledVideo = styled.div`
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'grid')};
  flex-direction: column;
  grid-template-columns: 4fr 2fr;
  position: relative;
  width: 100vw;
  height: 100vh;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;
`

const StyledChevron = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const StyledLeftCol = styled(motion.div)`
  position: relative;
  border-right: ${({ $isMobile }) => ($isMobile ? '' : '1px var(--main-color, #e0954f) solid')};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #000;
  height: 100%;
  overflow-y: scroll;
`
const StyledLeftText = styled.div`
  position: relative;
  height: auto;
  padding: 20px;
  margin-top: 100px;
`
const StyledRightCol = styled(motion.div)`
  color: #000;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  font-size: 0.8rem;
`

const StyledVideoContainer = styled.div`
  height: 450px;
  width: min(100%, 700px);
  border-radius: 10px;
  background-color: #000000;
  border: 1px solid var(--main-color, #e0954f);
`

const StyledVideoNotifier = styled.div`
  position: relative;
  z-index: 10;

  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  color: #fff;
`

const StyledFooter = styled.div`
  position: relative;
  width: max(300px, 50%);
  min-height: 120px;
  left: 0;
  right: 0;
  margin: 50px auto;
  padding-bottom: 200px;
  text-align: center;
  z-index: 5;
`
