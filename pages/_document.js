import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
            rel="preload"
            href="/fonts/OggBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/OggRegular.ttf"
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
