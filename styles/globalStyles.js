import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
    font-size: 16px;
  }
  
:root {
    --title-font-en: 'Ogg';
    --title-font-zh: 'Noto Serif TC'
    --subtitle-font-en: 'Baskervville';
    --subtitle-font-zh: 'Noto Serif TC';
    --main-font-en: 'EB Garamond';
    --main-font-zh: 'Noto Sans TC';
    --main-color: #e0954f;
    --main-bg-color: #cc5e0a;
    
    --node-bg-color: #000000D0;
    --node-text-expandBg-color: #000000E0;
    --node-image-video-expandBg-color: transparent;
    --node-border-color: #000;
    --node-svg-color: #706d68a0;
    --node-connetor-color: #eb6c0c;
    --node-tooltip-color: #c2a05d50;
    --node-handle-color: #FFF;
    --node-height: 200px;
    --node-width: 300px;

    --agenda-slide-color: #d6c6a3;
    --agenda-tooltip-color: #f2e446;

  }

`
