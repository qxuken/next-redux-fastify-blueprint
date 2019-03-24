import React, { Component, Fragment } from 'react';
import Layout from 'components/Layout';

@Layout
class Index extends Component {
  render() {
    return (
      <Fragment>
        <h1>This this index page</h1>
        <p>{process.env.FRONT_ENV}</p>
      </Fragment>
    );
  }
}

export default Index;
