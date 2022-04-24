/* #2.16 Create a declarations file for Theme */
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    //? styled.js 에 있는 name들 그대로 가져와서 type정의해주면 된다. (즉 앞으로 2곳을 고쳐야 함, 조금 성가심)
    mainBgColor: string;
    textColor: string;
  }
}
