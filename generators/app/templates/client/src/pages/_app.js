import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Layout from 'layouts';
import styled, { css, ThemeProvider } from 'styled-components';

import LoadingScreen from 'components/LoadingScreen';
// import { flashError } from 'actions/flashMessage';
import { setLoaded } from 'actions/status';
import { checkForAuthToken } from 'actions/auth';

import withReduxStore from 'utils/withReduxStore';
import Theme from 'utils/theme';
import { getCookie } from 'utils/cookies';
// import 'static/css/main.css';
class MyApp extends App {
  state = {
    loaded: false,
  };

  componentDidMount = async () => {
    // eslint-disable-next-line
    console.log('componentDidMount');
    const {
      router,
      reduxStore: { dispatch },
    } = this.props;
    const rememberMe = getCookie('rememberMe');
    if (rememberMe) {
      const hasToken = await dispatch(checkForAuthToken());
      if (hasToken) {
        // eslint-disable-next-line
        console.log('HAS A TOKEN');
        // redirect to dashboard
        await router.push('/dashboard');
      } else {
        // eslint-disable-next-line
        console.log('NO TOKEN!!!');
        // redirect to login if not on signup page
        if (router.pathname !== '/signup') {
          await router.push('/login');
        }
      }
    }
    // let pages know data has loaded
    dispatch(setLoaded());
    // load component after route change finishes
    this.setState({ loaded: true });
  };

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;
    const { loaded } = this.state;
    // const rememberMe = getCookie('rememberMe');

    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider theme={Theme}>
            <Layout title="V2GO | 2019">
              <LoadingScreen loaded={loaded} />
              <FadeIn loaded={loaded}>
                {loaded && <Component key={router.route} {...pageProps} />}
              </FadeIn>
            </Layout>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);

const FadeIn = styled.div`
  ${({ theme }) => theme.styles.grow}

  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s ease 0.3s;

  ${({ loaded }) =>
    loaded &&
    css`
      pointer-events: all;
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease 0.3s, visibility 0.3s;
    `}
`;
