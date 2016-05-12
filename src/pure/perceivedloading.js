import React from 'react';
import Arrow from './arrow';
import Checkbox from './checkbox';

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
    <div style={cellStyle} className='rg-cell'>
      <span className='perceived-loading' style={style}>&nbsp;</span>
    </div>
  );
}

const PerceivedLoading = ({numberOfLoadingItems, bulkSelectionEnabled, columnHeaders, renderExpandedRow}) => {
  var dom = [];
  for(var i=0; i<numberOfLoadingItems; i++){
    dom.push(
      <div key={i} className="rg-row-container">
        <div key={i} className="rg-row">
        { bulkSelectionEnabled ? <Checkbox {...this.props} /> : null }
        { columnHeaders.map(function(item, cellIndex){
          var cellProps = { width: item.style.width, rowIndex:i, cellIndex:cellIndex, index:cellIndex };
          return <PerceivedCell key={i+'-'+cellIndex} {...cellProps}  />;
        })}
        { (renderExpandedRow) ? <Arrow expanded={false} />: null }
        </div>
      </div>
    );
  }
  return <div>{dom}</div>;
}


export default PerceivedLoading;
