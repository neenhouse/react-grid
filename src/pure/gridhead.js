import React from 'react';
import Util from '../util';
import BulkOptions from './bulkoptions';
import BulkSelection from './bulkselection';
import ExpandRowColumn from './expandrowcolumn';

function sort(columnHeader, currSort, dispatch, ev){
	ev.preventDefault();
	var newSort = {
				sortColumn:columnHeader.sortColumn
			};
	if(currSort && newSort.sortColumn === currSort.sortColumn){
		newSort.sortDirection = (currSort.sortDirection === 'ASC') ? 'DESC' : 'ASC';
	} else {
		newSort.sortDirection = columnHeader.sortDirection || 'DESC';
	}
	dispatch('updateSortData', newSort);
}

const GridHead = ({ columnHeaders, dispatch, sortData, bulkSelectionEnabled, bulkSelectionChecked, renderExpandedRow }) => {
	var currSort = sortData || {};
	return (
		<div className="rg-header">
			<div className="rg-row">
				<BulkSelection bulkSelectionEnabled={bulkSelectionEnabled} bulkSelectionChecked={bulkSelectionChecked} dispatch={dispatch}/>
				{ columnHeaders.map(function(columnHeader, index){
					if(columnHeader.sortColumn){
						var current = (currSort.sortColumn === columnHeader.sortColumn) ? 'current' : '',
								ascClass = 'north' + ((current && currSort.sortDirection === 'ASC') ? ' current' : ''),
								descClass = 'south' + ((current && currSort.sortDirection === 'DESC') ? ' current' : ''),
								style = {};
						return (<div className='rg-cell' key={index} style={columnHeader.style}>
								<a href='#' onClick={sort.bind(null, columnHeader, currSort, dispatch)} className={current}>
										{columnHeader.description}
										<span className='arrows'>
											<i className={ascClass}></i>
											<i className={descClass}></i>
										</span>
								</a>
							</div>);
					} else {
						return (
							<div className='rg-cell' key={index} style={columnHeader.style}>
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
