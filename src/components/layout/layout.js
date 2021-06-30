import React from 'react';
import MainNavigation from './Header/MainNavigation';
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette : {
      primary : {
        main : '#0a4e6b',
        light : '#457a99',
        dark : '#002640'
      },
      secondary : {
        main : '#65f384',
        light : '#9dffb5',
        dark : '#20bf55'
      }
    }
  });
const Layout =  (props) =>{
    return(
        <>
        <ThemeProvider theme={theme}>
          <MainNavigation />
            <main>
              <Container maxWidth="lg" style={{height: '100%'}}>
                {props.children}
              </Container>
            </main>
        </ThemeProvider>
        </>
    );
};
export default Layout;