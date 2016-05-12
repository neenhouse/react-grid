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
  sortColumn:'Name'
}, {
  description: 'Email',
  flex: 1
}, {
  description: 'Address',
  flex:2
}, {
  description: 'Rating',
  flex:1
}];

function renderRow(rowData, i){
  return [
    <span key={'row'+i+'-col1'}>{rowData.firstName} {rowData.lastName}</span>,
    <span key={'row'+i+'-col2'}>{rowData.email}</span>,
    <span key={'row'+i+'-col3'}>{rowData.address}</span>,
    <span key={'row'+i+'-col4'}>{rowData.rating}</span>
  ];
}

function renderExpandedRow(rowData){
  return <div>{rowData.description}</div>;
}

var allExamples = [{
  title:'Basic',
  config:{
    ...ReactGrid.defaultProps,
    columnHeaders: columnHeaders,
    data:peopleJSON,
    renderRow: renderRow,
    renderExpandedRow: renderExpandedRow,
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
    bus.on('updategriddata', function(start, end){
      setTimeout(function(){
        this.state.example.config.data = AjaxStore.get(start, end);
        this.state.example.config.pager.total = AjaxStore.get().length;
        this.forceUpdate();
      }.bind(this), 1000);
    }.bind(this));
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

  render(){
    if(!this.state.example){ return null; }
    var formGroupStyle = {
      display:'inline-block',
      marginRight:30
    };
    var textAreaClassName = (this.state.editConfigErrors) ? 'errors' : '';
    return (
      <div className="container">
        <h3>Usage</h3>
        <pre>
        {"<ReactGrid {...config} />"}
        </pre>

        <div className="row">
          <div className="col-3">
            <h3>Controls</h3>
            { allExamples.map(function(example){
                return <button key={example.title} onClick={this.loadExample.bind(this, example)}>{example.title}</button>;
              }.bind(this))
            }
            <div className='form-group' style={formGroupStyle}>
              <button onClick={this.toggleLoading.bind(this)}>Trigger 1s Reload</button>
            </div>
            <div className='form-group' style={formGroupStyle}>
              <button onClick={this.emptyData.bind(this)}>Empty Grid</button>
            </div>
          </div>
          <div className="col-4">
            <h3>Edit Options</h3>
            <textarea className={textAreaClassName} style={{ width:'100%', height:100}} value={this.state.configEdit} onChange={this.updateConfig.bind(this, 'full')}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <h3>{this.state.example.title}</h3>
              <ReactGrid ref='reactgrid' {...this.state.example.config} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
var demoContainer = document.getElementById('body');
ReactDOM.render(<Demo />, demoContainer);
