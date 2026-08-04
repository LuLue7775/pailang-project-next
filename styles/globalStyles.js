import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
    font-size: 16px;
  }
  
:root {
    --title-font-en: 'Playfair Display';
    --title-font-zh: 'Noto Serif TC';
    --subtitle-font-zh: 'Noto Serif TC';
    --main-font-en: 'Times New Roman';
    --main-font-zh: 'Noto Serif TC';
    --main-color: #FFC93C;
    --aux-color: #2C558D;
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
