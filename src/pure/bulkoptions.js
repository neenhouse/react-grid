import React from 'react';

var ClassProperties = {
	// Callback function for table interactions
	dispatch: [React.PropTypes.func, function(){}],

	// Close function that is mixed in from parent portal (ui-react-luna-popover)
	close:[React.PropTypes.func, null]
};

export default class BulkOptions extends React.Component {

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
   *  updateAllCheckboxes()
   *  @param shouldCheck {boolean}
   *  Handle the onClick Event for the bulk select button
   *  Set all data points' checked value to true/false (check/uncheck all) based on shouldCheck boolean value
   */
  updateAllCheckboxes(shouldCheck, ev) {
    ev.preventDefault();
    this.props.dispatch('updateAllCheckboxes', shouldCheck);
    this.props.close();
  }

  /**
   *  render()
   *  Renders this component
   */
	render(){
		return (
      <div>
        <ul className="cs-grid-bulk-links">
          <li><a href="#" onClick={this.updateAllCheckboxes.bind(this, true)}>Select Visible</a></li>
          <li><a href="#" onClick={this.updateAllCheckboxes.bind(this, false)}>Select None</a></li>
        </ul>
      </div>
		);
	}
}
