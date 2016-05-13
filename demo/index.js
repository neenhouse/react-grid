import React from 'react';
import ReactDOM from 'react-dom';
import ReactGrid from '../src/index';
import peopleJSON from './2000people.js';
import './demostyle';
import $ from 'jquery';
import AjaxStore from './ajaxstore';
import { EventEmitter } from 'events';

var bus = new EventEmitter();

var columnHeaders = [{
  description: 'Name',
  flex: 1,
  sortColumn:'firstName'
}, {
  description: 'Email',
  flex: 1,
  sortColumn:'email'
}, {
  description: 'Address',
  flex:2
}, {
  description: 'Rating',
  flex:1,
  sortColumn:'rating'
}];

function renderRow(rowData, i){
  return [
    <a href="#" key={'row'+i+'-col1'}>{rowData.firstName} {rowData.lastName}</a>,
    <span key={'row'+i+'-col2'}>{rowData.email}</span>,
    <span key={'row'+i+'-col3'}>{rowData.address}</span>,
    <span key={'row'+i+'-col4'}>{rowData.rating}</span>
  ];
}

function renderExpandedRow(rowData){
  return <div>{rowData.description}</div>;
}

var allExamples = [{
  title:'Tabular Grid',
  config:{
    ...ReactGrid.defaultProps,
    columnHeaders: columnHeaders,
    renderRow: renderRow,
    renderExpandedRow: renderExpandedRow,
    bulkSelectionEnabled:true
  }
}];

function filterEditableConfigurations(config){
  var editableConfig = {};
  for(var i in config){
    if(i !== 'data' && i !== 'columnHeaders'){
      editableConfig[i] = config[i];
    }
  }
  return JSON.stringify(editableConfig, null, 2);
}

class Demo extends React.Component {
  state = {
    example:allExamples[0],
    configEdit:filterEditableConfigurations(allExamples[0].config)
  };

  constructor(props){
    super(props);
    // Fake ajax external state provider
    bus.on('updategriddata', function(start, end, sortColumn, sortDirection){
      this.state.example.config.data = null;
      if(sortDirection && sortColumn){
        this.state.example.config.sortData = {
          sortDirection:sortDirection,
          sortColumn:sortColumn
        }
      }
      this.forceUpdate();
      setTimeout(function(){
        this.state.example.config.data = AjaxStore.get(start, end, sortColumn, sortDirection);
        this.state.example.config.pager.total = AjaxStore.getTotal();
        this.forceUpdate();
      }.bind(this), 1000);
    }.bind(this));
  }

  componentDidMount(){
    bus.emit('updategriddata', 0, 20, 'firstName', 'ASC');
  }

  loadExample(example){
    this.state.example = example;
    this.updateConfigEdit();
    this.forceUpdate();
  }

  updateConfigEdit(){
    this.state.configEdit = filterEditableConfigurations(this.state.example.config);
    this.state.editConfigErrors = false;
  }

  updateConfig(property, value){
    if(property === 'full'){
      try{
        var newConfig = JSON.parse(value.target.value);
        this.state.example.config = {
          ...this.state.example.config,
          ...newConfig
        };
        this.updateConfigEdit();
        this.forceUpdate();
      } catch(e){
        // silently fail
        this.setState({
          editConfigErrors:true,
          configEdit:value.target.value
        });
      }
    } else {
      this.state.example.config[property] = value;
      this.updateConfigEdit();
      this.forceUpdate();
    }
  }

  toggleLoading(){
    this.state.example.config.data = null;
    this.forceUpdate();
    setTimeout(function(){
      bus.emit('updategriddata', this.state.example.config.pager.index, this.state.example.config.pager.index + this.state.example.config.pager.items);
    }.bind(this), 1000);
  }

  emptyData(){
    this.state.example.config.data = [];
    this.forceUpdate();
  }

  sort(sortData){
    // Sort data
    bus.emit('updategriddata', null, null, sortData.sortColumn, sortData.sortDirection);
  }

  page(pageData){
    this.state.example.config.pager = pageData;
    bus.emit('updategriddata', pageData.first, pageData.last);
  }

  toggle(toggled){
    this.setState({
      toggled:toggled.length
    });
  }

  render(){
    if(!this.state.example){ return null; }
    var textAreaClassName = (this.state.editConfigErrors) ? 'errors' : '';
    return (
      <div className="container">
        <h3>Usage</h3>
        <pre>
        {"<ReactGrid {...config} />"}
        </pre>

        <div className="row">
          <div className="col-5">
            <h3>Test npm Controls</h3>
            { /*
              TODO: toggle between examples
              allExamples.map(function(example){
                return <div className='form-group' key={example.title}>
                          <button onClick={this.loadExample.bind(this, example)}>{example.title}</button>
                       </div>;
              }.bind(this))
              */
            }
            <div className='form-group'>
              <button onClick={this.toggleLoading.bind(this)}>Trigger 1s Reload</button>
            </div>
            <div className='form-group'>
              <button onClick={this.emptyData.bind(this)}>Empty Grid</button>
            </div>
          </div>
          <div className="col-5">
            <h3>Edit Options</h3>
            <textarea className={textAreaClassName} style={{ width:'100%', height:100}} value={this.state.configEdit} onChange={this.updateConfig.bind(this, 'full')}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <h3>{this.state.example.title} {(this.state.toggled > 0) ? <span>({this.state.toggled} selected)</span> : null }</h3>
              <ReactGrid ref='reactgrid' {...this.state.example.config} onSort={this.sort.bind(this)} onPage={this.page.bind(this)} onToggle={this.toggle.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
var demoContainer = document.getElementById('body');
ReactDOM.render(<Demo />, demoContainer);
