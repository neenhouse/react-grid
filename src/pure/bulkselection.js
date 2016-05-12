import React from 'react';
import Checkbox from './checkbox';
const BulkSelection = ({bulkSelectionEnabled, bulkSelectionChecked, dispatch}) => {
	if(bulkSelectionEnabled){
		return <Checkbox rowData={{ __all:true, checked:bulkSelectionChecked }} dispatch={dispatch} bulkSelectionEnabled={bulkSelectionEnabled}/>
	} else {
		return <noscript />;
	}
}

export default BulkSelection;
