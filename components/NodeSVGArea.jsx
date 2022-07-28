import { useEffect } from 'react'
import styled from 'styled-components'
import { setRefs } from '../utils/functions'


export default function NodeSVGArea({ elementAmount, connectors, nodeID, pathRefs, totalConnectors, elementData, allElementsData }) {
  // console.log(elementData);

  // useEffect(() => {
  //   console.log(totalConnectors)
  // }, [totalConnectors])


  return (
    <StyledSvgArea className="svg-area" elementAmount={elementAmount}>
      {connectors.length && 
        connectors.map((lineObj, i) => (
          <StyledPath
            linestyle={lineObj?.border_style}
            key={`svg-${nodeID}-${i}`}
            id={`${nodeID}-${lineObj?.connected_node}`}
            className={`${nodeID} path`}
            ref={(thisSvgElem) => setRefs(thisSvgElem, pathRefs, totalConnectors) }
            strokeDasharray={
              lineObj?.line_style === 'dashed'
                ? '10, 10'
                : lineObj?.line_style === 'dotted'
                ? '2, 2'
                : '0, 0'
            }
          />
        ))}
    </StyledSvgArea>
  )
}

const StyledPath = styled.path`
  fill: var(--node-svg-color, #706d68a0);
  stroke: var(--node-svg-color, #706d68a0);
`

const StyledSvgArea = styled.svg`
  position: absolute;
  top: calc(var(--node-height, 200px) / 2);
  width: 100%;
  height: ${({ elementAmount }) => elementAmount * 200}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  z-index: -1;
`
