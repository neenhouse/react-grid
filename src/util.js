
var expandColumnStyle = {
	width:'25px'
};

function computeWidths(columnHeaders, hasExpand){
	var totalFlex = 0;
	// Add up flex properties
	for(var i=0; i<columnHeaders.length; i++){
		if(columnHeaders[i].flex === undefined){
			columnHeaders[i].flex = 1;
		}
		totalFlex += columnHeaders[i].flex;
	}
	// Calculate expanded column flex
	if(hasExpand){
		var expandFlex = (0.025 * totalFlex);
		totalFlex += expandFlex;
	}
	// Assign styles to columns
	for(i=0; i<columnHeaders.length; i++){
		columnHeaders[i].style = {
			width:((columnHeaders[i].flex / totalFlex) * 100) + '%'
		};
	}
	return columnHeaders;
}

function findRecord(haystack, needle){
  for(var _i=0; _i<haystack.length; _i++){
    if(JSON.stringify(haystack[_i]) === JSON.stringify(needle)){
        return needle;
    }
  }
  return false;
}

function calculatePager(nextPager, currPager, dataLength){

	// Merge values
	nextPager = {...currPager, ...nextPager};

	var total = nextPager.total;

	if(!total){
		total = dataLength;
	}

	// Calculate new values
	var first = 1 + ((nextPager.index - 1) * nextPager.items),
			last = Math.min(total, nextPager.index * nextPager.items),
			pages = Math.ceil(total / nextPager.items);

	// Edge case
	if(nextPager.index > 1 && first > total){
		return calculatePager({ ...pager, index:nextPager.index - 1 });
	}

	nextPager = {
		...nextPager,
		first:first,
		last:last,
		pages:pages,
		total:total,
		allowPrevious:(nextPager.index - 1) > 0,
		allowNext:(nextPager.index + 1) <= pages,
		showPages:pages > 1,
		empty: nextPager.total === 0
	};

	return nextPager;
}

export default {
	computeWidths:computeWidths,
	getExpandColumnStyle:function(){
		return expandColumnStyle;
	},
	findRecord:findRecord,
	calculatePager:calculatePager
};
