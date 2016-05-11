import React from 'react';

var widthPattern = [
      [50, 35, 70, 70],
      [40, 45, 75, 70],
      [60, 50, 65, 70],
      [50, 30, 90, 70]
];

const PerceivedCell = ({rowIndex, cellIndex, width}) => {
  var style = {
    width:widthPattern[rowIndex%4][cellIndex%4] + '%'
  };
  if(cellIndex === 0){
    style.backgroundColor = '#D4E5FE';
  }
  var cellStyle = {
    verticalAlign:'middle',
    width:width
  };
  return (
    <div style={cellStyle} className='grid-cell'>
      <span className='perceived-loading' style={style}>&nbsp;</span>
    </div>
  );
}

export default PerceivedCell;
