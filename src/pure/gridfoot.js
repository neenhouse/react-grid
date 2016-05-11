import React from 'react';

function updateIndex(dispatch, pages, e){
  e.preventDefault();

	var index = parseInt(e.target.value);
	if(index > 0 && index <= pages || !e.target.value){
		dispatch('updatePageData', {
			index:index
		});
	}
}

function previous(dispatch, index, e){
  e.preventDefault();
  var newIndex = index - 1;
  if(newIndex > 0){
    dispatch('updatePageData', {
      index: newIndex
    });
  }
}

function next(dispatch, index, pages, e){
  e.preventDefault();
  var newIndex = index + 1;
  if(newIndex <= pages){
    dispatch('updatePageData', {
      index: newIndex
    });
  }
}

function updateIncrement(dispatch, e){
  e.preventDefault();
  dispatch('updatePageData', {
    items:parseInt(e.target.value)
  });
}

const GridFoot = (props) => {

  if(props.total === 0){
    return null;
  } else {
		var prevPageClass = 'pager' + ((props.allowPrevious) ? '' : ' pager-disabled'),
				nextPageClass = 'pager' + ((props.allowNext) ? '' : ' pager-disabled');
    return (<div className='grid-footer'>
			<div className="pager-controls">
				<input type="number"
							onChange={updateIndex.bind(this, props.dispatch, props.pages)}
							min="1"
							max={props.pages}
							name="pager-input"
							value={props.index} /> of <span>{props.pages}</span>
				<button className={prevPageClass} onClick={previous.bind(this, props.dispatch, props.index)}>‹</button>
				<button className={nextPageClass} onClick={next.bind(this, props.dispatch, props.index, props.pages)}>›</button>
			</div>
      <div className="pager-range">
        <select className="pager-select"
                value={props.items}
                onChange={updateIncrement.bind(this, props.dispatch)}>
        { props.increments.map(function(increment){
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
        <div className="pager-records">{props.first} - {props.last} of {props.total}</div>
      </div>
    </div>
    );
  }
}

export default GridFoot;
