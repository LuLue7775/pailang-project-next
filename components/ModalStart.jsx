import React, { useRef, useContext } from 'react'
import { CursorContext } from '../context/cursorContext';
import styled from "styled-components";
import { EllipseBtnSVG } from './Svgs';

export default function ModalStart({ setModalShow, modalData }) {
    const { hoverEvent, setHoverEvent } =  useContext(CursorContext)
    const modalRef = useRef()
    const { title, title_zh, content, content_zh } = modalData || {}

    return (
        <StyledModal className='modal' ref={modalRef}>
            <StyledModalTitle className='modal-title'>
                <h3> {title} </h3>
                <h4 className='ch'> {title_zh} </h4>
            </StyledModalTitle>
            <StyledModalContent>
                <div className='ch'> { content_zh } </div>
                <div className='en'> { content } </div>
            </StyledModalContent>
            <div onClick={() => setModalShow(false)}
                onMouseOver={() => setHoverEvent("expand")}
                onMouseLeave={() => setHoverEvent("default")}  
            > 
                <EllipseBtnSVG texts={"Start"}/>
            
             </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: absolute;
    height: 500px;
    width: 700px;
    left: 0; 
    right: 0; 
    top: 0; 
    bottom: 0; 
    margin: auto;

    border-radius: 20px;
    background-color: #FFFFFF60;
    color: #000;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.4rem;

`;
const StyledModalTitle = styled.div`
    text-align: center;
    padding-bottom: 15px;
`;
const StyledModalContent = styled.div`
    // max-height: 50%; 
    max-width: 80%; 
    overflow: hidden;
    font-size: .8rem;
`;
