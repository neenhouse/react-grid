import React from 'react';
import Util from '../util.js';
import classnames from 'classnames';
import Checkbox from './checkbox';
import Arrow from './arrow';
import PerceivedLoading from './perceivedloading';
import EmptyMessage from './emptymessage';

// Toggles row in grid body
function toggleRow(rowData, dispatch, ev) {
  if (ev.target.nodeName !== 'A' && ev.target.nodeName !== 'INPUT' && !(typeof ev.target.className.match === 'function' && ev.target.className.match('bulk-checkbox'))) {
    dispatch('expandRow', rowData);
  }
}

const GridBody = (props) => {
  if(props.bodyErrors){
    return (
      <div className='error-message'>
        {props.bodyErrors}
      </div>
    );
  } else if(props.data === null){
    return <PerceivedLoading {...props} />
  } else if(props.data === []){
    return <EmptyMessage>{props.emptyMessage}</EmptyMessage>
  } else {
    return (
      <div className="grid-body">
        { props.data.map(function(rowData, rowIndex){
            return <div className='row-container' key={ 'row'+rowIndex }>
                      <div onClick={toggleRow.bind(this, rowData, props.dispatch)}
                         className={classnames({ 'grid-row':true, 'striped-row':rowIndex%2===0, 'clickable': props.renderExpandedRow })}>
                        <Checkbox {...props} rowData={rowData} />
                        {props.renderRow(rowData, rowIndex).map(function(item, cellIndex){
                          return <div key={'row'+rowIndex+'cell'+cellIndex}
                                      className='grid-cell'
                                      style={props.columnHeaders[cellIndex].style}>{item}</div>;
                        })}
                        {(props.renderExpandedRow) ? <Arrow expanded={rowData.expanded} />: null
                        }
                      </div>
                      { props.renderExpandedRow ?
                        <div className={ classnames({'expanded': true, hidden:!rowData.expanded}) }>
                          { props.renderExpandedRow(rowData) }
                        </div> : null
                      }
                  </div>;
        })}
      </div>
    );
  }
}

export default GridBody;
