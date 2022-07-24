import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
    font-size: 16px;
  }
  
:root {
    --title-font-en: 'Ogg';
    --title-font-zh: 'Noto Serif TC'
    --subtitle-font-en: 'Baskervville';
    --subtitle-font-zh: 'Noto Serif TC'
    --main-font-en: 'Gotu';
    --main-font-zh: 'Noto Sans TC'
    --main-color: #DF6000;
    
    --node-bg-color: #000000A0;
    --node-expandBg-color: #cc5e0ae0;
    --node-border-color: #f09c5d;
    --node-svg-color: #706d68a0;
    --node-connetor-color: #eb6c0c;
    --node-tooltip-color: #c2a05d50;
    --node-handle-color: #e3bc6f;
    --node-height: 200px;
    --node-width: 300px;

  }
  
`
