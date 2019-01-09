import React from 'react';
import Helmet from 'react-helmet';

import { parseContent } from '../../global/utils';

const NoMatch = ({ data }) => (
  <div>
    {data != null ? (
      <div>
        <Helmet title={data.title.rendered} />
        <h1>{data.title.rendered}</h1>
        <div dangerouslySetInnerHTML={parseContent(data.content.rendered)} />
      </div>
    ) : (
      <div>loading...</div>
    )}
  </div>
);

export default NoMatch;
