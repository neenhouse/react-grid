import './style';
import React from 'react';
import classnames from 'classnames';
import GridHead from './pure/gridhead';
import GridBody from './pure/gridbody';
import GridFoot from './pure/gridfoot';
import Util from './util';
import EmptyMessage from './pure/emptymessage';

var ClassProperties = {
	// If set to true, renders a checkbox in the first column
	bulkSelectionEnabled: [React.PropTypes.bool, false],

	// Use client side paging
	clientSide: [React.PropTypes.bool, false],

	// Array of column definitions (required)
	// Ex: [{
	//			description: 'Name',
  //			flex: 1,
	//			sortColumn:'Name',
	//      sortDirection:'ASC',
	//      isDefault:true
  //		}]
	columnHeaders: [React.PropTypes.array, null],

	// Function that is executed on callback when accessing count response
	countAccessor: [React.PropTypes.func, function(response){ return response; }],

	// Provide data directly to grid.  Use with "dataProvider" set to false.
	data: [React.PropTypes.array, null],

	// Function that is executed on callback when accessing data response
	dataAccessor: [React.PropTypes.func, function(response){ return response; }],

	// Message to display if data error occurs
	dataErrorMessage: [React.PropTypes.string, null],

	// Callback function for table interactions
	dispatch: [React.PropTypes.func, function(){}],

	// Empty message to display to user
	emptyMessage: [React.PropTypes.string, 'No records found.'],

	// Number of items to show when loading data (defaults to 10)
	numberOfLoadingItems: [React.PropTypes.number, 10],

	// Callback for paging
	onPage: [React.PropTypes.func, function(pageData){ console.log('page updated:', pageData)}],

	// Callback for sorting
	onSort: [React.PropTypes.func, function(sortData){ console.log('sort updated:', sortData)}],

	// Callback for toggling
	onToggle: [React.PropTypes.func, function(allToggled){ console.log('toggled:', allToggled)}],

	// Provide pager state
	pager: [React.PropTypes.object, {
		increments: [10, 20, 50, 100],
		index:1,
		items:20,
		total:0
	}],

	// Provide function for rendering expanded row
	renderExpandedRow: [React.PropTypes.any, false],

	// Provide row rendering function.  Takes "rowData" as first argument.
	// EXAMPLE:
	// renderRow:function(rowData){
	//   return <span>{rowData.firstName}</span>;
	// }
	renderRow:[React.PropTypes.func.isRequired, null],

	// Sets initial sort information
	sortData: [React.PropTypes.object, {
		sortColumn:null,
		sortDirection:null
	}],

	// If set to false, will allow multiple rows to be expanded
	singleExpand: [React.PropTypes.bool, true],

	// If set to false, does not render column headers
	useHeader: [React.PropTypes.bool, true],

	// Sets usage mode of pager (supports true, false, and 'manual')
	usePager: [React.PropTypes.any, true]
};

class ReactGrid extends React.Component {

	///// Class Propreties
	static propTypes = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][0];
		return o;
	}, {});

	static defaultProps = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][1];
		return o;
	}, {});

	// Name this component for React Debugger
	static displayName = 'Grid';

	// Default state
	state = {
		pager:null,
		sortData:null,
		data:null,
		bulkSelectionChecked:false
	};

	constructor(props, context){
		super(props, context);
		if(props.data){
			this.state.data = props.data;
		}
		this.updatePagerState(props.pager);
	}

	componentWillReceiveProps(nextProps, prevProps){
		// Check if pager state needs update
		if(nextProps.data !== undefined && Util.deepCompare(nextProps.data, this.state.data)){
			this.state.data = nextProps.data;
			this.forceUpdate();
		}

		// Check if data state needs update
		if(nextProps.pager !== undefined && Util.deepCompare(nextProps.pager, this.state.pager)){
			var dataLength = (nextProps.data && nextProps.data.length);
			this.updatePagerState(nextProps.pager, dataLength);
			this.forceUpdate();
		}

		// Check if data state needs update
		if(nextProps.sortData !== undefined && Util.deepCompare(nextProps.sortData, this.state.sortData)){
			this.state.sortData = nextProps.sortData;
			this.forceUpdate();
		}
	}

	getData(){
		// Apply local paging options
    if(this.props.usePager === true && this.props.clientSide === true && this.state.data){
      return this.state.data.slice(this.state.pager.first-1, this.state.pager.last-1);
    }
		return this.state.data;
	}

	updatePagerState(nextPager, dataLength){
		nextPager = nextPager || {};
		var currPager = this.state.pager || ReactGrid.defaultProps.pager,
				dataLength = dataLength || this.state.data && this.state.data.length;
		this.state.pager = Util.calculatePager(nextPager, currPager, dataLength);
	}

	dispatch(action, data){
		switch(action){
			case 'expandRow':
				this.toggleExpanded(data);
				break;
			case 'updatePageData':
				// If user backspaces to a blank input, update state to show that
				// but do not dispatch any actions
				if(data.index !== undefined && !data.index){
					this.state.pager.index = '';
				} else {
					// Otherwise, process as usual
					this.updatePagerState(data);
					this.props.onPage(this.state.pager);
				}

				this.forceUpdate();
				break;
			case 'updateSortData':
				this.props.onSort(data);
				this.setState({
					sortData:data
				});
				break;
			case 'toggleCheckbox':
				if(data.__all === true){
					this.state.bulkSelectionChecked = !this.state.bulkSelectionChecked;
					this.getData().forEach(function toggle(v){
						v.checked = this.state.bulkSelectionChecked
					}.bind(this));
				} else {
					var row = Util.findRecord(this.getData(), data);
					row.checked = !row.checked;
				}
				var checkedRows = Util.getChecked(this.getData());
				this.props.onToggle(checkedRows);
				break;
			case 'toggleAllCheckboxes':
				// TODO: implement this
				this.getData().forEach(function toggle(v){
					v.checked = shouldCheck;
				});
				break;
			default:
				console.warn('unimplemented action:', action);
				break;
		}
	}

	/**
   *  toggleExpanded()
   *  @param rowData {object}
   *  Given a row of data, flip "expanded" property and raise event
   */
  toggleExpanded(rowData){
    // find record from data and update it
    var row = Util.findRecord(this.getData(), rowData),
        newExpandState = !row.expanded;

    // reset rows
    if(this.props.allowMultipleExpandedRows !== true){
      var data = this.getData();
      for(var i=0; i<data.length; i++){
        data[i].expanded = false;
      }
    }
    // update target row
    row.expanded = newExpandState;

		this.forceUpdate();
  }

	/**
	 *	render()
	 *  Render this component
	 */
	render(){
		// Compute widths
		var columnHeaders = Util.computeWidths(this.props.columnHeaders, this.props.renderExpandedRow !== false)

		return (
				<div className='rg-wrapper'>
					<div className='rg-grid'>
						<GridHead {...this.props} data={this.getData()} dispatch={this.dispatch.bind(this)} columnHeaders={columnHeaders} sortData={this.state.sortData} bulkSelectionChecked={this.state.bulkSelectionChecked}/>
						<GridBody {...this.props} data={this.getData()} dispatch={this.dispatch.bind(this)} columnHeaders={columnHeaders} />
					</div>
					<GridFoot {...this.props} data={this.state.data} dispatch={this.dispatch.bind(this)} {...this.state.pager} />
				</div>
		);
	}
}
// Export to window object, if it exists
if(window){
  window.ReactGrid = ReactGrid;
}
export default ReactGrid;
