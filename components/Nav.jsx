import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { LayoutGroup } from 'framer-motion'
import { useRouter } from 'next/router'
import { SoundPlaying, SoundSetPlay } from './Svgs'
import useSound from 'use-sound'

export default function Nav() {
  const router = useRouter()
  const [isRouteChange, setRouteChange] = useState(false)
  const [isSoundPlay, setSoundPlay] = useState(false)

  const parseURL = () => {
    if (router.pathname.startsWith('/article-journal')) return '誌 PAILANG’S journal'
    else if (router.pathname.startsWith('/article-scenography')) return '圖表 PAILANG’S diagram'
    else if (router.pathname.startsWith('/article-video')) return '放映 PAILANG’S video'
  }

  useEffect(() => {
    const handleRouteChange = () => setRouteChange(false)
    const handleRouteComplete = () => setRouteChange(true)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  const [play, { stop }] = useSound('/sounds/pailang_soundtrack.wav')

  return (
    <LayoutGroup type="crossfade">
      <StyledNavContainer className="nav-container ">
        <StyledNavLeft>
            <div onClick={() => router.reload(window.location.pathname)}>
              <a>
                <StyledNavItem>{parseURL()}</StyledNavItem>
              </a>
            </div>
        </StyledNavLeft>

        <StyledNavRight>
          <>
            <Link href="/about">
              <a>
                <StyledNavItem> ABOUT </StyledNavItem>
              </a>
            </Link>
            <Link href="/agenda">
              <a>
                <StyledNavItem> AGENDA </StyledNavItem>
              </a>
            </Link>

            <div
              onClick={() => {
                setSoundPlay(!isSoundPlay)
                !isSoundPlay ? play() : stop()
              }}
            >
              {isSoundPlay ? <SoundPlaying /> : <SoundSetPlay />}
            </div>
          </>
        </StyledNavRight>
      </StyledNavContainer>
    </LayoutGroup>
  )
}

const StyledNavContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-family: var(--title-font-en), serif;
`
const StyledNavLeft = styled.div`
  display: flex;
  color: #000;
  cursor: pointer;
`
const StyledNavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledNavItem = styled.div`
  padding: 0 6px 0 6px;
`
