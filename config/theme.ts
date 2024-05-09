import { extendTheme } from "native-base";

export const theme = extendTheme({
  config: {
      useSystemColorMode: true,
  },
  components: {
    Text: {
      baseStyle: (props: any) => {
        return {
          _light: { color: 'black' },
          _dark: { color: 'white' },
        };
      },
    }
  },
});