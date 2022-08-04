import { useRef, useEffect, useState } from 'react'
import NodeBoxAndSVG from './NodeBoxAndSVG'
import { motion } from 'framer-motion'
import { createMarkup } from '../utils/functions'
import styled from 'styled-components'

export default function NodesContainer({ data }) {
  const nodeRefs = useRef([])
  const pathRefs = useRef([])
  const nodePosRefs = useRef([])

  const [totalConnectors, setTotalConnectors] = useState()

  useEffect(() => {
    setTotalConnectors(data?.nodes.reduce((total, node) => node.connectors.length + total, 0))
  }, [])

  return (
    <StyledNodeContainer id="section2" as={motion.div} element_amount={data?.nodes?.length}>
      <StyledNodeBoxContainer elementAmount={data?.nodes?.length}>
        {totalConnectors &&
          data?.nodes?.map((elementData, node_i) => (
            <NodeBoxAndSVG
              key={`box${elementData?.id}`}
              allElementsData={data?.nodes}
              elementData={elementData}
              node_i={node_i}
              nodeRefs={nodeRefs}
              pathRefs={pathRefs}
              nodePosRefs={nodePosRefs}
              totalConnectors={totalConnectors}
            />
          ))}
      </StyledNodeBoxContainer>
      <StyledFooter
        className="author-bio"
        dangerouslySetInnerHTML={data?.author_bio && createMarkup(data?.author_bio)}
      />
    </StyledNodeContainer>
  )
}

const StyledNodeContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`

const StyledNodeBoxContainer = styled.div`
  position: relative;
  height: ${({ elementAmount }) => elementAmount * 200}px;
`
const StyledFooter = styled.div`
  position: relative;
  width: max(300px, 50%);
  min-height: 120px;
  left: 0;
  right: 0;
  margin: 200px auto ;
  // padding-bottom: 100px;
  text-align: center;
  z-index: 5;
`
