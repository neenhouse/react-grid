import React from 'react';
import Util from './util.js';
import classnames from 'classnames';
import Checkbox from './pure/checkbox';
import Arrow from './pure/arrow';
import PerceivedCell from './pure/perceived';
import EmptyMessage from './pure/emptymessage';


var ClassProperties = {
  // String containing any errors
  bodyErrors:[React.PropTypes.string, null],

  // Determines whether or not the body is ready to render
  bodyReady: [React.PropTypes.bool, false],

  // If set to true, renders a checkbox in the first column
  bulkSelectionEnabled: [React.PropTypes.bool, false],

  // Array of column definitions (required)
	// Ex: [{
	//			description: 'Name',
	// 			descriptionFormatted:'First <br /> Name',
  //			flex: 1,
	//			sortColumn:'Name',
	//      sortDirection:'ASC',
	//      isDefault:true
  //		}]
	columnHeaders: [React.PropTypes.array, null],

  // Provide data directly to grid.  Use with "dataProvider" set to false.
  data: [React.PropTypes.array, null],

  // Callback function for table interactions
	dispatch: [React.PropTypes.func, function(){}],

  // If set to false, will not show expand arrows
	expandArrowEnabled: [React.PropTypes.bool, true],

	// Number of items to show when loading data
	numberOfLoadingItems: [React.PropTypes.number, null],

  // Provide function for rendering expanded row
	renderExpandedRow: [React.PropTypes.any, false],

  // Provide row rendering function.  Takes "rowData" as first argument.
	// EXAMPLE:
	// renderRow:function(rowData){
	//   return <td>{rowData.firstName}</td>;
	// }
	renderRow:[React.PropTypes.func.isRequired, null]
};

export default class GridBody extends React.Component {

  static displayName = 'GridBody';

  ///// Class Propreties
	static propTypes = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][0];
		return o;
	}, {});

	static defaultProps = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][1];
		return o;
	}, {});

  /**
   *  getLoading()
   *  Gets loading state elements
   */
  getLoading(){
    var dom = [];
    for(var i=0; i<this.props.numberOfLoadingItems; i++){
      dom.push(
        <div key={i} className="grid-row">
          { this.props.bulkSelectionEnabled ? this.renderCheckbox({checked:false}) : null }
          { this.props.columnHeaders.map(function(item, cellIndex){
            var cellProps = { width: item.style.width, rowIndex:i, cellIndex:cellIndex, index:cellIndex };
            return <PerceivedCell key={i+'-'+cellIndex} {...cellProps}  />;
          })}
          { (this.props.renderExpandedRow) ? <Arrow expanded={false} />: null }
        </div>
      );
    }
    return (
      <div className="grid-body">
      { dom }
      </div>
    );
  }

  /**
   *  toggleRow()
   *  Event handler to toggle a row
   */
  toggleRow(rowData, ev) {
    if (ev.target.nodeName !== 'A' && ev.target.nodeName !== 'INPUT' && !(typeof ev.target.className.match === 'function' && ev.target.className.match('bulk-checkbox'))) {
      this.props.dispatch('expandRow', rowData);
    }
  }

  /**
   *  render()
   *  Renders this component
   */
  render(){
    if(this.props.bodyErrors){
      return (
        <div className='feedback-msg error message'>
          {this.props.bodyErrors}
        </div>
      );
    } else if(this.props.data === null){
      return this.getLoading();
    } else if(this.props.data === []){
      return <EmptyMessage>{this.props.emptyMessage}</EmptyMessage>
    } else {
      return (
        <div className="grid-body">
          { this.props.data.map(function(rowData, rowIndex){
              return <div className='row-container'>
                      <div key={ 'row'+rowIndex }
                            onClick={this.toggleRow.bind(this, rowData)}
                            className={classnames({ 'grid-row':true, 'striped-row':rowIndex%2===0, 'clickable': this.props.renderExpandedRow })}>
                        <Checkbox {...this.props} rowData={rowData} />
                        {this.props.renderRow(rowData, rowIndex).map(function(item, cellIndex){
                          return <div key={'row'+rowIndex+'cell'+cellIndex} className='grid-cell' style={this.props.columnHeaders[cellIndex].style}>{item}</div>;
                        }.bind(this))}
                        {(this.props.renderExpandedRow) ? <Arrow expanded={rowData.expanded} />: null
                        }
                      </div>
                      { this.props.renderExpandedRow ?
                        <div className={ classnames({'expanded': true, hidden:!rowData.expanded}) }>
                          { this.props.renderExpandedRow(rowData) }
                        </div> : null
                      }
                    </div>;
          }.bind(this))}
        </div>
      );
    }
  }
}
