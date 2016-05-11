import React from 'react';

function toggleCheckbox(rowData, dispatch, ev){
  dispatch('toggleCheckbox', rowData);
}

const Checkbox = ({rowData, bulkSelectionEnabled, dispatch}) => {
	if(bulkSelectionEnabled){
		return <div className="grid-cell bulk-checkbox">
        <input id="default-check" type="checkbox" checked={rowData.checked} onChange={toggleCheckbox.bind(this, rowData, dispatch)}></input>
      </div>;
	} else {
		return <noscript />;
	}
}

export default Checkbox;
