import { useContext } from 'react'
import JournalLeftCol from './JournalLeftCol';
import NodesContainer from './NodesContainer';
import { UpChevronSVG } from './Svgs';
import styled from "styled-components";
import { slideTo } from '../utils/functions';
import { CursorContext } from '../context/cursorContext'

export default function JournalContent({ data, spring }) {
  const { hoverEvent, setHoverEvent } =  useContext(CursorContext)

  return (
    <StyledJournal id="section2" className='pOne-content-container' >
        <StyledChevron 
          onClick={() => slideTo(0, spring)} 
          onMouseOver={() => setHoverEvent("expand")}
          onMouseLeave={() => setHoverEvent("default")}  
        > 
            <UpChevronSVG />
        </StyledChevron>

        <StyledJournalLeftCol className='left-col' > 
            <JournalLeftCol content={data?.content} />
        </StyledJournalLeftCol>

        <StyledJournalRightCol className='right-col'   > 
        
        <NodesContainer data={data} />
        </StyledJournalRightCol>
    </StyledJournal>
  )
}




 const StyledJournal = styled.div`
   position: relative;
   display:grid;
   grid-template-columns:2fr 3fr;
   height: 100vh;
   width: 100%;
   padding-top: 60px;


   font-family: 'Noto Serif TC', serif;
   font-weight: 200;
   letter-spacing: 1px;
`;


  
const StyledChevron = styled.div`
  position: absolute;
  top:0;
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;


const StyledJournalLeftCol = styled.div`
 height: 100%;
 overflow-y:scroll;
 font-size: .9rem;
`;

const StyledJournalRightCol = styled.div`
 display: flex;
 flex-direction: column;
 
 height: 100%;

 border-left: 1px #FFB304 dashed;

 overflow-y:scroll;
`;

