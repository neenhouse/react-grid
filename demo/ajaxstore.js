import _peopleJSON from './2000people.js';
class AjaxStore {
  sortColumn = null;
  sortDirection = null;
  first = 0;
  last = 0;
  get(first, last, sortColumn, sortDirection){
    var peopleJSON = _peopleJSON;
    if(sortColumn && sortDirection){
      peopleJSON.sort(function(a, b){
        var multipler = 1;
        if(sortDirection === 'DESC'){
          multipler = -1;
        }
        var aValue = (a[sortColumn].toLowerCase && a[sortColumn].toLowerCase()) || a[sortColumn],
            bValue = (b[sortColumn].toLowerCase && b[sortColumn].toLowerCase()) || b[sortColumn];
        if(aValue < bValue) return -1 * multipler;
        if(aValue > bValue) return 1 * multipler;
        return 0;
      });
    }
    if(typeof first === 'number'){
      this.first = first;
    }
    if(typeof last === 'number'){
      this.last = last;
    }
    return peopleJSON.slice(this.first, this.last);
  }
  getTotal(){
    return _peopleJSON.length;
  }
}
export default new AjaxStore();
