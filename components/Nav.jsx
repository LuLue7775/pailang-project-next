import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { LayoutGroup } from 'framer-motion'
import { useRouter } from 'next/router'
import { SoundPlaying, SoundSetPlay } from './Svgs'
import { useTransition } from '../context/transitionContext'
import useSound from 'use-sound'

export default function Nav() {
  const router = useRouter()
  const { slideTo } = useTransition()
  const [isRouteChange, setRouteChange] = useState(false)
  const [isSoundPlay, setSoundPlay] = useState(false)

  const parseURL = () => {
    // 首頁與 About 顯示館名品牌
    if (router.pathname === '/' || router.pathname === '/about')
      return { __html: '白浪博物館 Pailang Museum' }
    if (router.pathname === '/agenda') return { __html: '白浪博物館 Pailang Museum' }

    if (router.pathname.startsWith('/article-journal'))
      return { __html: '白浪雜誌 <br/> Pailang Journal' }
    else if (router.pathname.startsWith('/article-scenography'))
      return { __html: '白浪圖表 <br/> Pailang Scenography' }
    else if (router.pathname.startsWith('/article-video'))
      return { __html: '白浪電影 <br/> Pailang Cinema' }
    else if (router.pathname.startsWith('/article-field'))
      return { __html: '白浪現場 <br/> Pailang Field' }
  }

  useEffect(() => {
    const handleRouteChange = () => setRouteChange(false)
    const handleRouteComplete = () => setRouteChange(true)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  const [play, { stop }] = useSound('/sounds/pailang_soundtrack.wav')

  return (
    <LayoutGroup type="crossfade">
      <StyledNavContainer className="nav-container " $isBlackBg={router.pathname === '/agenda' || router.pathname === '/about'}>
        <StyledNavLeft>
          <div onClick={() => router.reload(window.location.pathname)}>
            <a>
              <StyledNavItem dangerouslySetInnerHTML={parseURL()} />
            </a>
          </div>
        </StyledNavLeft>

        <StyledNavRight>
          <>
            <Link href="/about">
              <a
                onClick={(e) => {
                  e.preventDefault()
                  slideTo('/about')
                }}>
                <StyledNavItem> ABOUT </StyledNavItem>
              </a>
            </Link>
            <Link href="/agenda">
              <a
                onClick={(e) => {
                  e.preventDefault()
                  slideTo('/agenda')
                }}>
                <StyledNavItem> AGENDA </StyledNavItem>
              </a>
            </Link>

            <div
              onClick={() => {
                setSoundPlay(!isSoundPlay)
                !isSoundPlay ? play() : stop()
              }}>
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
  font-family: var(--main-font-zh, serif);
  border-bottom: 1px #df600050 solid;
  padding: 10px;
  /* /agenda 頁面為黑底，其餘維持黃底 */
  background: ${({ $isBlackBg }) => ($isBlackBg ? '#000' : 'var(--main-color, #FFC93C)')};
`
const StyledNavLeft = styled.div`
  display: flex;
  color: inherit;
  cursor: pointer;
`
const StyledNavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledNavItem = styled.div`
  display: inline-block;
  padding: 0 6px 2px;
  font-size: 0.7rem;
  cursor: pointer;
  /* 與全站一致的「由左往右畫出」底線；nav bar 底色會變（黑/金），故用 currentColor 確保對比 */
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: left 100%;
  background-size: 0% 1.5px;
  transition: background-size 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s ease;

  &:hover {
    background-size: 100% 1.5px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`
