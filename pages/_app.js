import Head from 'next/head'
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import styled from 'styled-components'
import { GlobalStyles } from '../styles/globalStyles'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import CursorProvider from '../context/cursorContext'
import HomeArticleTypeProvider from '../context/homeArticleTypeContext'
import TransitionProvider from '../context/transitionContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // Modal effect
  const [modalShow, setModalShow] = useState(true)
  useEffect(() => {
    if (router.pathname === '/') {
      setModalShow(true)
    }
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>Pailang Museum</title>
      </Head>
      <CursorProvider>
        <HomeArticleTypeProvider>
          <TransitionProvider>
            <GlobalStyles />
            <StyledApp className="app" id="app">
              <StyledHeader className="header" route={router.pathname}>
                <Nav modalShow={modalShow} />
              </StyledHeader>

              <StyledLayout route={router.pathname}>
                <Component {...pageProps} modalShow={modalShow} setModalShow={setModalShow} />
              </StyledLayout>
            </StyledApp>
          </TransitionProvider>
        </HomeArticleTypeProvider>
      </CursorProvider>
    </>
  )
}

export default MyApp

const StyledApp = styled.div`
  position: relative;
  width: 100%;
`
const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  overflow: hidden;
  z-index: 10;

  a {
    text-decoration: none;
  }

  /* 首頁 header 黃底黑字；About / Agenda header 黑底黃字；其餘透明 */
  background-color: ${({ route }) =>
    route === '/'
      ? 'var(--main-color, #ffc93c)'
      : route === '/about' || route === '/agenda'
      ? '#000'
      : 'transparent'};
  color: ${({ route }) =>
    route === '/about' || route === '/agenda' ? 'var(--main-color, #ffc93c)' : '#000'};
`

const StyledLayout = styled.div`
  position: relative;
  bottom: 0;
  z-index: 0;
`
