import React from 'react';
import Util from '../util';

const Arrow = ({ expanded }) => {
  var arrow = (!expanded) ? <span>&#9660;</span> : <span>&#9650;</span>;
  return <div style={Util.getExpandColumnStyle()}>
    {arrow}
  </div>;
}

export default Arrow;
