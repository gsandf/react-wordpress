import { createGlobalStyle } from 'styled-components';

import { resetCSS } from './reset';

// prettier-ignore
export default createGlobalStyle`
  ${resetCSS}
  #root {
    height: 100%;
  }
`;
