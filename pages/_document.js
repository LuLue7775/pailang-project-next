import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
            rel="preload"
            href="/fonts/RiccioneSerialBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/RiccioneSerialBoldItalic.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/RiccioneSerialItalic.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/RiccioneSerialLightItalic.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/RiccioneSerialMedium.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/RiccioneSerialXlight.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200&display=swap" rel="stylesheet"/>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
