import { useState } from 'react'
import Nav from '../components/Nav'
import styled from 'styled-components'
import { GlobalStyles } from '../styles/globalStyles'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import CursorProvider from '../context/cursorContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // Modal effect
  const [modalShow, setModalShow] = useState(true)

  return (
    <CursorProvider>
      <GlobalStyles />
      <StyledApp className="app" id="app">
        <StyledHeader className="header" route={router.pathname}>
          <Nav modalShow={modalShow} />
        </StyledHeader>

        <StyledLayout route={router.pathname}>
          <Component {...pageProps} modalShow={modalShow} setModalShow={setModalShow} />
        </StyledLayout>
      </StyledApp>
    </CursorProvider>
  )
}

export default MyApp

const StyledApp = styled.div`
  position: relative;
  width: 100%;
`
const StyledHeader = styled.div`
  position: absolute;
  height: 60px;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  padding: 10px;

  a {
    text-decoration: none;
  }

  background-color: transparent;
`

const StyledLayout = styled.div`
  position: relative;
  bottom: 0;
  z-index: 0;
  // overflow:hidden;
`
