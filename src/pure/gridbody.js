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
  var content = null;
  if(props.dataErrorMessage){
    content = (
      <div className='error-message'>
        {props.dataErrorMessage}
      </div>
    );
  } else if(props.data === null){
    content = <PerceivedLoading {...props} />
  } else if(props.data.length === 0){
    content = <EmptyMessage>{props.emptyMessage}</EmptyMessage>
  } else {
    content = props.data.map(function(rowData, rowIndex){
        return <div className={classnames({'rg-row-container':true, 'clickable': props.renderExpandedRow})} key={ 'row'+rowIndex }
                  onClick={toggleRow.bind(this, rowData, props.dispatch)}>
                  <div className={classnames({ 'rg-row':true, 'striped-row':rowIndex%2===0 })}>
                    <Checkbox {...props} rowData={rowData} />
                    {props.renderRow(rowData, rowIndex).map(function(item, cellIndex){
                      return <div key={'row'+rowIndex+'cell'+cellIndex}
                                  className='rg-cell'
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
    });
  }
  return <div className="rg-body">{content}</div>
}

export default GridBody;
