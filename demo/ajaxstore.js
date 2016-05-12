import _peopleJSON from './2000people.js';
class AjaxStore {
  sortColumn = null;
  sortDirection = null;
  first = 0;
  last = 0;
  get(first, last, sortColumn, sortDirection){
    var peopleJSON = _peopleJSON;
    if(sortColumn && sortDirection){
      peopleJSON = peopleJSON.sort(function(a, b){
        if(sortDirection === 'DESC'){
          return a[sortColumn] > b[sortColumn];
        } else {
          return a[sortColumn] < b[sortColumn];
        }
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
