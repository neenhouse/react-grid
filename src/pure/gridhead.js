import React from 'react';
import Util from '../util';
import BulkOptions from './bulkoptions';
import BulkSelection from './bulkselection';
import ExpandRowColumn from './expandrowcolumn';

function sort(columnHeader, sortData, dispatch, ev){
	ev.preventDefault();
	var currSort = sortData[0],
			newSort = {
				sortColumn:columnHeader.sortColumn
			};
	if(currSort && newSort.sortColumn === currSort.sortColumn){
		newSort.sortDirection = (currSort.sortDirection === 'ASC') ? 'DESC' : 'ASC';
	} else {
		newSort.sortDirection = columnHeader.sortDirection || 'DESC';
	}
	dispatch('updateSortData', [newSort]);
}

const GridHead = ({ columnHeaders, dispatch, sortData, bulkSelectionEnabled, renderExpandedRow }) => {
	var currSort = (sortData && sortData[0]) || {};
	return (
		<div className="grid-header">
			<div className="grid-row">
			<BulkSelection bulkSelectionEnabled={bulkSelectionEnabled} />
			{ columnHeaders.map(function(columnHeader, index){
				if(columnHeader.sortColumn){
					var current = (currSort.sortColumn === columnHeader.sortColumn) ? 'current' : '',
							ascClass = 'caret4 north' + ((current && currSort.sortDirection === 'ASC') ? ' sortdirection' : ''),
							descClass = 'caret4 south' + ((current && currSort.sortDirection === 'DESC') ? ' sortdirection' : ''),
							style = {};
					return (<div className='grid-cell' key={index} style={columnHeader.style}>
							<a href='#' onClick={sort.bind(null, columnHeader, sortData, dispatch)} className={current}>
									{columnHeader.description}
									<i className={ascClass}></i>
									<i className={descClass}></i>
							</a>
						</div>);
				} else {
					return (
						<div className='grid-cell' key={index} style={columnHeader.style}>
							{columnHeader.description}
						</div>
					);
				}
			})}
			<ExpandRowColumn renderExpandedRow={renderExpandedRow}/>
			</div>
		</div>
	);
};

export default GridHead;
