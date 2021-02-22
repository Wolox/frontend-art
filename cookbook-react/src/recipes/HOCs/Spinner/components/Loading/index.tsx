import React from 'react';
import SpinkitSpinner, { SpinnerProps } from 'react-spinkit';

import { COLOR_SPINNER, SPINNER_DEFAULT } from './constants';

function Loading({ className = '', name = SPINNER_DEFAULT, color = COLOR_SPINNER, ...rest }: SpinnerProps) {
  return <SpinkitSpinner className={className} name={name} color={color} fadeIn="half" {...rest} />;
}

export default Loading;