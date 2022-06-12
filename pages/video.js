import React, { useState, useRef, useEffect, useLayoutEffect  } from 'react'
import dynamic from 'next/dynamic'
import useMediaQuery from '../utils/hooks';
import dataJson from '../dataset.json';

import styled from "styled-components";
import ReactPlayer from "react-player/lazy";

// import { createPortal, ReactDOM } from 'react-dom';
// import { createRoot } from 'react-dom/client';
import screenfull from 'screenfull';

// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

/**
 * might as well use html-react-parser
 */
export default function Video() {
  const { leftCol, rightCol } = dataJson?.videoPage;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const videoPlayerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);

  const [pip, setPip] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);

  const handleStop = () => {
    setPlaying(false);
  }
  const handlePlayPause = () => {
    setPlaying(!playing);
  }
  const handleClickFullscreen = async () => {
    setFullScreen(!fullscreen);

    if (screenfull.isEnabled) {
        screenfull.request(document.querySelector('.video-wrap') ) 
     }

  }
  
  /**
   * @TODO seek
   */
  const handleSeekMouseDown = e => {
    setSeeking(true);
  }

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  }

  const handleSeekMouseUp = e => {
    // const elem = document.getElementById("react-player").firstChild.firstChild;
    setSeeking(false);
    videoPlayerRef.current.seekTo(parseFloat(e.target.value));
    // videoPlayerRef.current.seekTo(parseFloat(e.target.value));
  }

  const handleProgress = state => {
    // console.log('onProgress', state);
    if (!seeking) {
      setPlayed(state.played);
    }
  }
  const handleDuration = (duration) => {
    // console.log('onDuration', duration);
    setDuration(duration);
  }


  /**
   * @TODO PIP
   */
  const handleEnablePIP = () => {
    setPip(true);
  }
  
  const handleDisablePIP = () => {
    setPip(false);
  }

  const [isWindow, setWindow] = useState(false);

  useEffect(() => {
    setWindow(true);
    // console.log(document.querySelector('#app'))    
    
  }, [])

  return (
    <>
    <StyledVideo isMobile={isMobile}>
      <StyledLeftCol className='left-col' isMobile={isMobile} fullscreen={fullscreen}>
        <StyledVideoContainer > 
          <VideoPLR ref={videoPlayerRef} fullscreen={fullscreen} onClick={handlePlayPause} isWindow={isWindow} leftCol={leftCol} handleClickFullscreen={handleClickFullscreen}/>
        </StyledVideoContainer>
        <StyledLeftText className='left-text'>
        {leftCol.content.map((item, i) => (
          <div key={i}>{item}</div>
          ))}
        </StyledLeftText>
      </StyledLeftCol>
      <StyledRightCol className='right-col' fullscreen={fullscreen}>
        {rightCol.content.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
      </StyledRightCol>
    </StyledVideo>

          {/* {fullscreen && 
          <Modal  videoRef={ videoPlayerRef.current }>  </Modal>
          } */}
        </>
  )
}

// const Modal = ({ children, videoRef,  }) => {
//   console.log(document.getElementById('video-wrap'))
//   // createRoot(document.getElementById('video-wrap'))

//   return createPortal(<FullscreenModal> render({document.getElementById('video-wrap')}) </FullscreenModal>, document.getElementById('portal'))
// };


// const FullscreenModal = styled.div`

//   position: absolute;
//   top: 0;
//   left: 0;

//   z-index: 100;
//   height: 100vh;
//   width:100%;
//   background: #FFF;

// `

const ReactPlayerWrap = styled.div`

  position:  reltive;
  // top:  ${({ fullscreen }) => fullscreen ? "-250px" : ""};
  
  z-index: 10;
  height:400px;
  width: 100%;
  // background: ${({ fullscreen }) => fullscreen ? "#000" : "" };

  &:hover { cursor: pointer };
`

const StyledVideo = styled.div`
    display: ${({ isMobile }) => isMobile ? "flex" : "grid"};
    flex-direction: column;
    grid-template-columns: 5fr 2fr;
    position: absolute;
    top: 250px;


    width:100vw;
    height: calc(100vh - 250px);

    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

    
`;

const StyledLeftCol = styled.div`
  position: relative;
  height: auto;
  border-right:  ${({ isMobile }) => isMobile ? "" : "1px #85807f dashed"} ;
  padding:  ${({ fullscreen }) => fullscreen ? "" : "20px"};
  font-size: .5px;
  color: #FFF;

`;
const StyledLeftText = styled.div`
  position: relative;
  height: auto;
  padding: 20px;
`;
const StyledRightCol = styled.div`
  position: relative;
  height: 100%;
  padding:  ${({ fullscreen }) => fullscreen ? "" : "20px"};
  font-size: .5px;
  color: #FFF;

`;


const StyledVideoContainer = styled.div`
  height: 450px;
  width: 100%;
  border-radius: 10px;
  background-color: #FFFFFF0F;
  // margin: 20px 0 20px 0;

`;

const StyledPlayPauseBtn = styled.button`
  position: absolute;
  // left: 50%;
  // bottom: 50%;
  // tranform: translate(-50%, -50%);
  height: 80%;
  width: 85vw;
  color: #FFF;
  background: none;
`
const StyledFullscreenBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
`;


const VideoPLR = React.forwardRef((props, ref) => {
  const { fullscreen, handlePlayPause, playing, isWindow, leftCol, handleClickFullscreen } = props;
  return (
    <ReactPlayerWrap className='video-wrap' id='video-wrap' fullscreen={fullscreen} onClick={handlePlayPause}>
    {isWindow && <ReactPlayer 
      id="react-player"
      ref={ref}
      url={leftCol?.videoUrl}
      className='react-player'
      width='100%'
      height='100%'
      controls={false}
      volume={0.8}
      // playing={playing}
      // onProgress={handleProgress}
      // onDuration={handleDuration}

      // onEnablePIP={handleEnablePIP}
      // onDisablePIP={handleDisablePIP}

      
    />}

<button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>

<button onClick={handleClickFullscreen}>Fullscreen</button>
  
  </ReactPlayerWrap>
  )
});

VideoPLR.displayName = `VideoPLR`;
