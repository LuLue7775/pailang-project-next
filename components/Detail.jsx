import React from 'react'
import styled from "styled-components"

export default function Detail({detailRef, fullScreen, setFullScreen }) {
    const toggleFullScreen = () => {
        setFullScreen(!fullScreen)
    };


  return (
    <StyledDetail className="detail full-size" ref={detailRef} onClick={toggleFullScreen} fullScreen={fullScreen} data-flip-id="auto-1" >
        <div className="content">
            <div className="title">Placeholder title</div>
            <div className="secondary">Placeholder secondary</div>
            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.</div>
        </div>
    </StyledDetail> 
  )
}

const StyledDetail = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    // transform: translate(-50%, 0);
    width: 300px;
    height: 600px;
    background: red;

    display: ${({ fullScreen }) => fullScreen ? 'block' : 'none'};
`;
