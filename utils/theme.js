import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Lato',
    body: 'Lato',
  },
  colors: {
    primary: {
      100: '#C3E9D0',
      200: '#9BDBB3',
      300: '#70CD94',
      400: '#4DC27E',
      500: '#1FB767',
      600: '#16a75c',
      700: '#069550',
      800: '#008444',
      900: '#006430',
    },
  },
});

export default theme;
