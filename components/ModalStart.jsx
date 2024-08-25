import { useRef, useContext } from 'react'
import { EllipseBtnSVG } from './Svgs'
import { createMarkup } from '../utils/functions'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'

export default function ModalStart({ handleStartClick, modalData }) {
  const { setHoverEvent } = useContext(CursorContext)
  const modalRef = useRef()
  const { title, title_zh, content, content_zh } = modalData || {}

  return (
    <StyledModal className="modal" ref={modalRef}>
      <StyledModalTitle className="modal-title">
        <StyledChTitle className="font-zh-sans"> {title_zh} </StyledChTitle>
        <h3> {title} </h3>
      </StyledModalTitle>
      <StyledModalContent>
        <div className="zh" dangerouslySetInnerHTML={content_zh && createMarkup(content_zh)} />
        <div className="en" dangerouslySetInnerHTML={content && createMarkup(content)} />
      </StyledModalContent>
      <div
        onClick={handleStartClick}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}>
        <EllipseBtnSVG texts={'Start'} />
      </div>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  position: absolute;
  height: 520px;
  width: min(700px, 80vw);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding-top: 20px;
  border-radius: 20px;
  background-color: #ffffff60;
  color: #000;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.4rem;
  text-align: justify;
`
const StyledModalTitle = styled.div`
  text-align: center;
  padding-bottom: 15px;
`
const StyledChTitle = styled.div`
  font-size: 1.2rem;
  letter-spacing: 1px;
  padding: 15px;
`
const StyledModalContent = styled.div`
  max-width: 80%;
  overflow: hidden;
  font-size: 0.8rem;
`
