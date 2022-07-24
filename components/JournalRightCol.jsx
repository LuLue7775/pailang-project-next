import DraggableBox from './DraggableBox'
import Xarrow, { Xwrapper } from 'react-xarrows'

import dataJson from '../dataset.json'

import styled from 'styled-components'

const parseConnectID = (id) => {
  let nodeNum = id.indexOf('-') + 1
  return `${id[0]}-${parseInt(id.slice(nodeNum)) + 1}`
}

export default function JournalRightCol() {
  const { rightCol } = dataJson?.homePage

  const arrowStyles = {
    startAnchor: 'left',
    endAnchor: 'right',
    color: '#FFF',
    lineColor: '#FFF',
    strokeWidth: 1,
    // dashness: { strokeLen: '2', nonStrokeLen: '5', animation: '-2' },
    curveness: false,
    showHead: true,
    headColor: '#FFF',
    headSize: 5,
    headShape: 'circle',
    showTail: true,
    tailColor: '#FFF',
    tailSize: 5,
    tailShape: 'circle'
  }

  return (
    <StyledJournalRightCol className="topicOne">
      {rightCol &&
        Object.keys(rightCol)?.map((topic, i) => (
          <Xwrapper key={i}>
            {rightCol[topic].map((elem, i) => (
              <div
                key={i}
                className={`draggable-wrap ${elem.id}`}
                // style={{
                // position: "relative",
                // height: "inherit",
                // width: "inherit"
                // }}
              >
                <DraggableBox
                  boxIndex={i}
                  id={elem.id}
                  node={elem.node} // {"type":"img", "content": ["url"] }
                  desciption={elem.desciption}
                />
                {elem.connectTail &&
                  elem.connectTo.map((node, i) => (
                    <Xarrow
                      key={i}
                      start={node}
                      end={elem.id}
                      dashness={elem.dashness[i]}
                      {...arrowStyles}
                    />
                  ))}
              </div>
            ))}
          </Xwrapper>
        ))}
    </StyledJournalRightCol>
  )
}

const StyledJournalRightCol = styled.div`
  position: relative;
  // height: ${({ nodeQuantity }) => `${nodeQuantity * 2000}px`};
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`
