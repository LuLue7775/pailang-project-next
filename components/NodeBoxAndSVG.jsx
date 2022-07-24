import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import NodeExpandAreaAndName from './NodeExpandAreaAndName'
import { DragHandleSVG } from './Svgs'
import {
  initialPath,
  updatePath,
  setRefs,
  genRandomPos,
  getWindowDimensions,
  toggleOpen
} from '../utils/functions'
import NodeSVGArea from './NodeSVGArea'
import NodeName from './NodeName'

export default function NodeBoxAndSVG({
  allElementsData,
  elementData,
  node_i,
  nodeRefs,
  pathRefs,
  nodePosRefs
}) {
  const router = useRouter()

  const [windowDimensions] = useState(() => getWindowDimensions())
  const [boxPos] = useState(genRandomPos(windowDimensions?.width, allElementsData, router.asPath))
  const [isOpen, setOpen] = useState([])
  const [tooltip, setTooltip] = useState(false)

  const x = useMotionValue(boxPos[node_i].x)
  const y = useMotionValue(boxPos[node_i].y)

  useEffect(() => {
    // fill in nodePosRefs with new gen boxpos
    setRefs({ x: boxPos[node_i].x, y: boxPos[node_i].y }, nodePosRefs, allElementsData?.length)

    // drag pos listener
    x.onChange((v) => {
      nodePosRefs.current[node_i].x = v
      updatePath(
        node_i,
        allElementsData[node_i]?.id,
        allElementsData,
        nodeRefs,
        pathRefs,
        nodePosRefs
      )
    })
    y.onChange((v) => {
      nodePosRefs.current[node_i].y = v
      updatePath(
        node_i,
        allElementsData[node_i]?.id,
        allElementsData,
        nodeRefs,
        pathRefs,
        nodePosRefs
      )
    })

    // intial svg, BUT DONT do it untill the whole nodePosRefs is imported.
    // meaning this will be execute only on nodePosRefs?.current[lastNode]
    if (nodePosRefs?.current.length !== allElementsData?.length) return
    initialPath(allElementsData[node_i]?.id, allElementsData, nodeRefs, pathRefs, nodePosRefs)
  }, [])

  return (
    <AnimatePresence>
      <StyledBoxContainer
        style={{ x, y }}
        borderstyle={elementData?.border_style}
        className="zh"
        key={`box${elementData?.id}`}
        id={elementData?.id}
        ref={(elementData) => setRefs(elementData, nodeRefs, allElementsData?.length)}
        as={motion.div}
        whileTap={{ cursor: 'grabbing', zIndex: 10 }}
        drag
        dragMomentum={false}
        hasContent={elementData?._value ? true : false}
      >
        <StyledDot />
        <StyledHandle hasContent={elementData?._value ? true : false}>
          <DragHandleSVG />
        </StyledHandle>

        <NodeExpandAreaAndName
          id={elementData?.id}
          isOpen={isOpen}
          toggleOpen={() => toggleOpen(allElementsData[node_i].id, isOpen, setOpen)}
          content={elementData?._value}
          contentZh={elementData?.text_zh}
          type={elementData?.type}
          source={elementData?.source}
          hasContent={elementData?._value ? true : false}
        />

        <NodeName
          hasContent={elementData?._value ? true : false}
          hasSource={elementData?.source ? true : false}
          isOpen={isOpen}
          source={elementData?.source}
          name={elementData?.name}
          name_zh={elementData?.name_zh}
          tooltip={tooltip}
          setTooltip={setTooltip}
        />
      </StyledBoxContainer>

      <NodeSVGArea
        elementAmount={allElementsData?.length}
        connectors={elementData?.connectors}
        nodeID={elementData?.id}
        pathRefs={pathRefs}
      />
    </AnimatePresence>
  )
}

const StyledBoxContainer = styled(motion.div)`
  position: absolute;
  height: ${({ hasContent }) => (hasContent ? 'var(--node-height, 200px)' : '0')};
  width: var(--node-width, 300px);
  display: flex;
  justify-content: center;
  overflow-wrap: break-word;
  color: #fff;
  background-color: var(--node-bg-color, #000000a0);

  ${({ hasContent }) => (hasContent ? 'border: 1px solid var(--node-border-color, #f09c5d);' : '')}
  border-radius: ${({ borderstyle }) => (borderstyle === 'oval' ? '50px' : '5px')};
  cursor: grab;
`

const StyledDot = styled(motion.div)`
  position: absolute;
  left: -3px;
  top: calc(var(--node-height, 200px) / 2);
  height: 5px;
  width: 5px;
  background-color: var(--node-connetor-color, #eb6c0c);
`

const StyledHandle = styled(motion.div)`
  position: absolute;
  left: 5px;
  top: ${({ hasContent }) => hasContent && '0'};
  bottom: 0;
  opacity: ${({ hasContent }) => !hasContent && 0};
  margin: auto 0;
  height: 50px;
  width: 15px;
  border-radius: 5px;
`
