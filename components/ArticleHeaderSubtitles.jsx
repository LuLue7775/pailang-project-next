import { subtitles } from '../utils/framerVariantsHeader'
import { LeftCrossSVG, RightCrossSVG } from './Svgs'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export default function ArticleHeaderSubtitles({
  artist,
  producer,
  curator,
  start_date,
  end_date
}) {
  return (
    <StyledSubtitlesWrap className="zh">
      <LeftCrossSVG />
      <StyledSubtitles as={motion.div} variants={subtitles} initial="initial" animate="animate">
        <div> {artist} </div>
        <div>
          <StyledSubtitlesMid>
            {producer && (
              <>
                <div> 製作單位 Produced by </div>
                <div>{producer} </div>
              </>
            )}
          </StyledSubtitlesMid>

          <div>
            {curator && (
              <>
                <div> 策展 Curated by </div>
                <div>{curator} </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div> {start_date} </div>
          <div> / </div>
          <div> {end_date} </div>
        </div>
      </StyledSubtitles>
      <RightCrossSVG />
    </StyledSubtitlesWrap>
  )
}

const StyledSubtitlesMid = styled.div`
  padding-bottom: 0.8rem;
`
const StyledSubtitlesWrap = styled.div`
  width: 100%;
  height: 20vh;
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
  height: 20vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
`
