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
      <StyledSubtitles as={motion.div} variants={subtitles} initial="initial" animate="animate">
        <div> {artist} </div>

        <StyledDate>
          <div> {start_date} </div>
          {end_date && (
            <>
              <div> / </div>
              <div> {end_date} </div>
            </>
          )}
        </StyledDate>

        <div>
          <StyledSubtitlesMid>
            {producer && (
              <>
                <div> 製作單位 Produced by </div>
                <div>{producer} </div>
              </>
            )}
          </StyledSubtitlesMid>

          <StyledSubtitlesMid>
            {curator && (
              <>
                <div> 策展 Curated by </div>
                <div>{curator} </div>
              </>
            )}
          </StyledSubtitlesMid>
        </div>
      </StyledSubtitles>
    </StyledSubtitlesWrap>
  )
}

const StyledDate = styled.div`
  div {
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
`

const StyledSubtitlesMid = styled.div`
  padding-bottom: 0.8rem;
`
const StyledSubtitlesWrap = styled.div`
  width: 100%;
  justify-items: center;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  text-align: center;
  margin: 0 10px;
  padding: 0 10px;

  height: auto;
  @media (min-width: 768px) {
    height: 20vh;
  }
`
const StyledSubtitles = styled(motion.div)`
  width: 100%;
  justify-items: center;
  align-items: center;
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: repeat(3, auto);
  gap: 10px;
  grid-template-columns: none;
  height: auto;

  @media (min-width: 768px) {
    height: 20vh;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: none;
    justify-content: space-between;
    gap: 20px;
  }
`
