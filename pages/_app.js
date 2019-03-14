import React, { Fragment } from 'react';
import { get } from 'lodash';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import getPageContext from 'lib-folder/getPageContext';
import { Logo } from 'components-folder/shared/Icons';

import withReduxStore from 'lib-folder/withReduxStore';
import { actions as systemActions } from 'redux-folder/ducks/system';
import { storeName as authorizationStoreName } from 'redux-folder/ducks/authorization';

import ServiceComponent from 'components-folder/ServiceComponent';

import 'styles-folder/main.scss';

@withReduxStore
class MainEntry extends App {
  static async getInitialProps({ Component, ctx }) {
    const { reduxStore } = ctx;
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { reduxStore, pageProps };
  }

  constructor() {
    super();
    this.pageContext = getPageContext();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const dispatch = get(this.props, 'reduxStore.dispatch');
    await dispatch(systemActions.sendInitFromClient());
    await this.setState({ loading: false });
  }

  render() {
    const { Component, appProps, pageProps, reduxStore } = this.props;
    const { loading } = this.state;
    if (loading)
      return (
        <Container>
          <div class="loader">
            <Logo />
          </div>
        </Container>
      );
    return (
      <Container>
        <div class="loader">
          <Logo />
        </div>
        <Provider store={reduxStore}>
            <Fragment>
              <Component pageContext={this.pageContext} {...appProps} {...pageProps} />
              <ServiceComponent />
            </Fragment>
        </Provider>
      </Container>
    );
  }
}

export default MainEntry;
