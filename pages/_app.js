import React, { Fragment } from 'react';
import { get } from 'lodash';
import App, { Container } from 'next/app';

import { Provider } from 'react-redux';
import { actions as systemActions } from 'store/ducks/system';

import withReduxStore from 'lib/withReduxStore';

import Loader from 'components/shared/Loader';
import ServiceComponent from 'components/ServiceComponent';

import 'styles/main.scss';

@withReduxStore
class MainEntry extends App {
  static async getInitialProps({ Component, ctx }) {
    const { reduxStore } = ctx;
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const dispatch = get(ctx, 'reduxStore.dispatch');
    await dispatch(systemActions.sendInitFromServer());
    return { reduxStore, pageProps };
  }

  state = {
    loading: true,
  };

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
          <Loader />
        </Container>
      );
    return (
      <Container>
        <Loader />
        <Provider store={reduxStore}>
          <Fragment>
            <Component
              pageContext={this.pageContext}
              {...appProps}
              {...pageProps}
            />
            <ServiceComponent />
          </Fragment>
        </Provider>
      </Container>
    );
  }
}

export default MainEntry;
