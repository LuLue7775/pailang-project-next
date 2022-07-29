import { useRef, useContext } from 'react'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'
import { EllipseBtnSVG } from './Svgs'

export default function ModalStart({ setModalShow, modalData }) {
  const { setHoverEvent } = useContext(CursorContext)
  const modalRef = useRef()
  const { title, title_zh, content, content_zh } = modalData || {}


  return (
    <StyledModal className="modal" ref={modalRef}>
      <StyledModalTitle className="modal-title">
        <h4> {title_zh} </h4>
        <h3> {title} </h3>
      </StyledModalTitle>
      <StyledModalContent>
        <div className="zh"> {content_zh} </div>
        <div className="en"> {content} </div>
      </StyledModalContent>
      <div
        onClick={() => setModalShow(false)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}
      >
        <EllipseBtnSVG texts={'Start'} />
      </div>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  position: absolute;
  height: 500px;
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
const StyledModalContent = styled.div`
  max-width: 80%;
  overflow: hidden;
  font-size: 0.8rem;

`
