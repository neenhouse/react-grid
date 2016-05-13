# React Grid [![Build Status](https://travis-ci.org/neenhouse/react-grid.svg?branch=master)](https://travis-ci.org/neenhouse/react-grid)

Flexible, Functional Grid Component Written For ReactJS


## Required Dependencies

- ReactJS 15.x


## Browser

- Can be accessed as global window.ReactGrid


## Installation

```
npm install neenhouse-react-grid --save;
```


## Demo

```
npm run demo
```


## Basic Usage

```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGrid from 'react-grid';
ReactDOM.render(<ReactGrid {...options} />, document.body);
```


## Default Options

```
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
```
