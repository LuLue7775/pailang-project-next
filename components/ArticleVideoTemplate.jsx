import { useRef } from 'react'

import ArticlesHeader from './ArticlesHeader'
import VideoPlayer from './VideoPlayer'

import { UpChevronSVG } from './Svgs'
import { useMediaQuery } from '../utils/hooks'
import { slideTo } from '../utils/functions'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import parse from 'html-react-parser'

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

      <StyledVideo id="section2" isMobile={isMobile}>
        <StyledLeftCol
          className="left-col en"
          isMobile={isMobile}
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
            {data?.video && <VideoPlayer ref={videoPlayerRef} video={data?.video} />}
          </StyledVideoContainer>
          <StyledLeftText className="left-text">
            {' '}
            {data?.description && parse(data?.description)}{' '}
          </StyledLeftText>
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
        >
          {data?.content && parse(data?.content)}
        </StyledRightCol>
      </StyledVideo>
    </>
  )
}

const StyledVideo = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'flex' : 'grid')};
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
  border-right: ${({ isMobile }) => (isMobile ? '' : 'var(--main-color, #e0954f) dashed')};
  padding: 20px;
  color: #000;

  height: 100%;
  overflow-y: scroll;
`
const StyledLeftText = styled.div`
  position: relative;
  height: auto;
  padding: 20px;
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
  width: 100%;
  border-radius: 10px;
  background-color: #0000005f;
  border: 1px solid var(--main-color, #e0954f);
`
