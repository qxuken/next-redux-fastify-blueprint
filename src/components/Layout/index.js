import React from 'react';
import Layout from './Layout';

function LayoutHOC(WrappedComponent) {
  return function() {
    return (
      <Layout>
        <WrappedComponent />
      </Layout>
    );
  };
}

export default LayoutHOC;
