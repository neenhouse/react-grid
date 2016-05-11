import React from 'react';
import merge from 'merge';

var ClassProperties = {
  // Callback function for table interactions
	dispatch: [React.PropTypes.func, function(){}],

  // First page item
  first:[React.PropTypes.number, null],

  // Total pages
  pages:[React.PropTypes.number, null],

  // Range
  items:[React.PropTypes.number, null],

	// Available increments (required)
	increments:[React.PropTypes.array.isRequired, null],

  // Current index
  index:[React.PropTypes.number, null]
};

export default class GridFoot extends React.Component {

  static displayName = 'GridFoot';

  ///// Class Propreties
	static propTypes = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][0];
		return o;
	}, {});

	static defaultProps = Object.keys(ClassProperties).reduce(function(o, v, i) {
		o[v] = ClassProperties[v][1];
		return o;
	}, {});

  state = {};

  ///// Constructor
  constructor(props, context){
    super(props, context);
    this.state.index = props.index;
  }

  componentWillReceiveProps(nextProps){
		// We need to track "index" in internal state to allow editing without dispatching actions
		if(nextProps.index){
			this.setState({
				index:nextProps.index
			});
		}
  }

  ///// Class Methods
  /**
   *  updateIndex()
   *  Handler that dispatches action to jump to page of data
   */
  updateIndex(e){
    e.preventDefault();
    // If user backspaces to a blank input, update state to show that
    // but do not dispatch any actions
    if(!e.target.value){
      return this.setState({
        index:''
      });
    }

    // Otherwise, process as usual
    var index = parseInt(e.target.value);
    if(index > 0 && index <= this.props.pages){
      this.props.dispatch('updatePageData', {
        index:index
      });
    }
  }

  /**
   *  previous()
   *  Handler that dispatches action to load previous page of data
   */
  previous(e){
    e.preventDefault();
    var newIndex = this.props.index - 1;
    if(newIndex > 0){
      this.props.dispatch('updatePageData', {
        index: newIndex
      });
    }
  }

  /**
   *  next()
   *  Handler that dispatches action to load next page of data
   */
  next(e){
    e.preventDefault();
    var newIndex = this.props.index + 1;
    if(newIndex <= this.props.pages){
      this.props.dispatch('updatePageData', {
        index: newIndex
      });
    }
  }

  /**
   *  updateIncrement()
   *  Handler that dispatches action to update page size
   */
  updateIncrement(e){
    e.preventDefault();
    this.props.dispatch('updatePageData', {
      items:parseInt(e.target.value)
    });
  }

  /**
   *  getPageControlsDOM()
   *  Helper to construct page controls DOM
   */
  getPageControlsDOM(){
    if(this.props.showPages){
      var prevPageClass = 'pager' + ((this.props.allowPrevious) ? '' : ' pager-disabled'),
          nextPageClass = 'pager' + ((this.props.allowNext) ? '' : ' pager-disabled');

      return (
        <div className="pager-controls">
					<input type="number"
								onChange={this.updateIndex.bind(this)}
								min="1"
								max={this.props.pages}
								name="pager-input"
								value={this.state.index} /> of <span>{this.props.pages}</span>
          <button className={prevPageClass} onClick={this.previous.bind(this)}>‹</button>
          <button className={nextPageClass} onClick={this.next.bind(this)}>›</button>
        </div>
      );
    }
  }

  /**
   *  getPageRangeDOM()
   *  Handler that constructs pager range DOM
   */
  getPageRangeDOM(){
    return (
      <div className="pager-range">
        <select className="pager-select"
                value={this.props.items}
                onChange={this.updateIncrement.bind(this)}>
        { this.props.increments.map(function(increment){
          var props = {
            key:increment,
            value:increment
          };
          return (
            <option {...props}>
              {increment}
            </option>
          );
        })}
        </select>
        <div className="pager-records">{this.props.first} - {this.props.last} of {this.props.total}</div>
      </div>
    );
  }

  /**
   *  render()
   *  Renders this component
   */
  render(){
    if(this.props.total === 0){
      return null;
    } else {
      return (<div className='grid-footer'>
        { this.getPageControlsDOM() }
        { this.getPageRangeDOM() }
      </div>
      );
    }
  }
}
