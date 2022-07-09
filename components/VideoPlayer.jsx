import React, { useState,  useEffect  } from 'react'

import styled from "styled-components";
import ReactPlayer from "react-player/lazy";
import screenfull from 'screenfull';

export const VideoPlayer = React.forwardRef((props, ref) => {
    const { video } = props;

    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [duration, setDuration] = useState(0);
    
    const handlePlayPause = () => {
      setPlaying(!playing);
    }
    const handleClickFullscreen = async () => {  
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
      setSeeking(false);
      ref.current.seekTo(parseFloat(e.target.value));
    }
  
    const handleProgress = state => {
      if (!seeking) {
        setPlayed(state.played);
      }
    }
    const handleDuration = (duration) => {
      setDuration(duration);
    }
  
    const [isWindow, setWindow] = useState(false);
  
    useEffect(() => {
      setWindow(true);      
    }, [])

    return (
      <ReactPlayerWrap className='video-wrap' id='video-wrap' onClick={handlePlayPause}>
      {isWindow && <ReactPlayer 
        id="react-player"
        ref={ref}
        url={video}
        className='react-player'
        width='100%'
        height='100%'
        controls={false}
        volume={0.8}
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration} 
      />}
        <ReactController>
            <StyledButton onClick={handlePlayPause}>
                {playing 
                ?
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFB304" className="pause" viewBox="0 0 16 16">
                      <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg> 
                 : 
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFB304" className="play" viewBox="0 0 16 16">
                      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                </svg>
                 }</StyledButton>
            <StyledButton onClick={handleClickFullscreen}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFB304" className="play" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
                </svg>
            </StyledButton>
            
            <StyledInput
                type='range' min={0} max={0.999999} step='any'
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
            />
        </ReactController>

    </ReactPlayerWrap>
    )
  });
  
VideoPlayer.displayName = `VideoPlayer`;
export default VideoPlayer;

const ReactPlayerWrap = styled.div`
  position:  relative;
  z-index: 10;

  height:400px;
  width: 100%;
  
`
const ReactController = styled.div`
  position: absolute;
  bottom: -48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  height: 50px;
  width: 100%;
  background-color: #4F4537;
  border-radius: 10px;

`

const StyledButton = styled.button`
  height: 50px;
  width: 60px;
  border: 1px solid #FFB304;
  background: none;
  &:hover { 
    cursor: pointer;
    background: #FFF;
  };
`
const StyledInput = styled.input`
    height: 2px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 75%;

    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 12px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 1px 1px 1px #002200;
        background: #B5A999;
        border-radius: 1px;
        border: 1px solid #FFB304;
      }

    ::-webkit-slider-thumb {
        box-shadow: 3px 3px 3px #B6B207;
        border: 2px solid #FFB304;
        height: 23px;
        width: 23px;
        border-radius: 23px;
        background: #4C2B1F;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
        &:hover { 
            cursor: pointer;
            background: #FFF;
          };
      }


`