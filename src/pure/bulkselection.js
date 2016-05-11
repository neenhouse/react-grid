import React from 'react';

const BulkSelection = ({bulkSelectionEnabled}) => {
	if(bulkSelectionEnabled){
		return <div className="grid-bulk"></div>;
	} else {
		return <noscript />;
	}
}

export default BulkSelection;
