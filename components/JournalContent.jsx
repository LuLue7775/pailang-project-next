import JournalLeftCol from './JournalLeftCol'
import NodesContainer from './NodesContainer'
import { UpChevronSVG } from './Svgs'
import styled from 'styled-components'
import { slideTo } from '../utils/functions'

export default function JournalContent({ data, spring, setHoverEvent }) {
  return (
    <StyledJournal id="section2">
      <StyledChevron
        onClick={() => slideTo(0, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}
      >
        <UpChevronSVG />
      </StyledChevron>

      <StyledJournalLeftCol className="left-col">
        <JournalLeftCol
          content={data?.content}
          content_zh={data?.content_zh}
          comment={data?.comment}
          comment_zh={data?.comment_zh}
        />
      </StyledJournalLeftCol>

      <StyledJournalRightCol className="right-col">
        <NodesContainer data={data} />
      </StyledJournalRightCol>
    </StyledJournal>
  )
}

const StyledJournal = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 4fr 5fr;
  height: 100vh;
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

const StyledJournalLeftCol = styled.div`
  height: 100%;
  overflow-y: scroll;
  font-size: 0.9rem;
`

const StyledJournalRightCol = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  border-left: 1px rgba(250, 170, 50, 1) dashed;

  overflow-y: scroll;
`
