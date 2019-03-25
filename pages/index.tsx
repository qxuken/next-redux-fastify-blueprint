import React from 'react';
import Layout from 'components/Layout';

function Index() {
  return (
    <Layout>
      <>
        <h1>This this index page</h1>
        <p>{process.env.FRONT_ENV}</p>
      </>
    </Layout>
  );
}

export default Index;
