import React from 'react';

import { cnBaseHeader } from '../cn-base-header';

export const BaseHeaderMenuDelimiter = (): React.ReactElement => {
  return <li className={cnBaseHeader('MenuDelimiter').toString()} />;
};
