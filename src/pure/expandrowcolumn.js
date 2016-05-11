import React from 'react';
import Util from '../util';

const ExpandRowColumn = ({renderExpandedRow}) => {
	if(renderExpandedRow){
		return <div style={Util.getExpandColumnStyle()}></div>
	} else {
		return <noscript />;
	}
}

export default ExpandRowColumn;
