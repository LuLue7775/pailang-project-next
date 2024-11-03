import JournalLeftCol from './JournalLeftCol'
import NodesContainer from './NodesContainer'
import { UpChevronSVG } from './Svgs'
import styled from 'styled-components'
import { createMarkup, slideTo } from '../utils/functions'

export default function JournalContent({ data, spring, setHoverEvent }) {
  return (
    <StyledJournal id="section2">
      <StyledChevron
        onClick={() => slideTo(0, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}>
        <UpChevronSVG />
      </StyledChevron>

      <JournalLeftCol
        content={data?.content}
        content_zh={data?.content_zh}
        comment={data?.comment}
        comment_zh={data?.comment_zh}
        author_bio={data?.author_bio}
        author_bio_zh={data?.author_bio_zh}
        extra_media={data?.extra_media}
      />
    </StyledJournal>
  )
}

const StyledJournal = styled.div`
  flex: 1;
  overflow: auto;

  position: relative;
  height: auto;
  width: 100%;
  padding-top: 60px;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;
`

const StyledChevron = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`



// const StyledJournalLeftCol = styled.div`
//   height: 100%;
//   overflow-y: scroll;
//   font-size: 0.9rem;
// `

// const StyledJournalRightCol = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   border-left: 1px var(--main-color, #e0954f) solid;
//   overflow-y: scroll;
// `
