import React from 'react';
import Helmet from 'react-helmet';

import { parseContent } from '../../global/utils';

const Example = ({ data }) => (
  <div>
    {data != null ? (
      <div>
        <Helmet title={data.title} />
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={parseContent(data.content)} />
      </div>
    ) : (
      <div>loading...</div>
    )}
  </div>
);

export default Example;
