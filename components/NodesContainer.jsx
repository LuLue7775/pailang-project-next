import { useRef, useEffect, useState } from 'react'
import NodeBoxAndSVG from './NodeBoxAndSVG'
import { motion } from 'framer-motion'
import styled from 'styled-components'


export default function NodesContainer({ data }) {
  const nodeRefs = useRef([])
  const pathRefs = useRef([])
  const nodePosRefs = useRef([])
  
  const [totalConnectors, setTotalConnectors] = useState()

  useEffect(() => {
    setTotalConnectors( data?.nodes.reduce( (total, node) => node.connectors.length + total, 0 ) )
  }, [])


  return (
    <StyledNodeContainer id="section2" as={motion.div} element_amount={data?.nodes?.length}>
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
          totalConnectors={ totalConnectors  }
        />
      ))}
    </StyledNodeContainer>
  )
}

const StyledNodeContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`
