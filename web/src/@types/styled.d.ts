import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      active: string;
      background: string;
      primaryText: string;
      placeHolder: string;
      card: string;
      backgroundDark: string;
      secundaryBackground: string;
      secundaryText: string;
      error: string;
    };
  }
}
