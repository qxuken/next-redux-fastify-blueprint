import React from 'react';
import Layout from './Component';

function LayoutWrapper(WrappedComponent) {
  return () => (
    <Layout>
      <WrappedComponent />
    </Layout>
  );
}

export default LayoutWrapper;
