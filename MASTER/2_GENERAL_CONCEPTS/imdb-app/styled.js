/* #2.15 Styled Component: Theme */
//! 주의: 이 Theme들은 항상 같은 이름을 가지고 있어야 함! (그래야 완벽하게 toggle(호환) 가능)
//* Step 1. 2가지의 Theme을 정의
// - Dark Mode
// - Light Mode

import colors from './colors';

export const lightTheme = {
  mainBgColor: colors.WHITE,
  textColor: colors.LIGHT_GREY,
};

export const darkTheme = {
  mainBgColor: colors.BLACK,
  textColor: colors.DARK_GREY,
};

//* 이 Theme들은 App.js에 적용하자 (see App.js)

/* #2.16 TypeScript 적용하면서, styled.d.ts에 type정의도 쌍으로 같이 해줘야함 (새로 prop 추가할 떄마다) */
