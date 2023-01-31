import React from 'react';
import { NextPage } from 'next';

const Index: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Honeywell CWP Application Catalog - Home</h1>
      {data}
    </div>
  );
};

Index.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Index;
