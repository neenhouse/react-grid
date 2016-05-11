import peopleJSON from './2000people.js';
class AjaxStore {
  get(first, last){
    return peopleJSON.slice(first, last);
  }
}
export default new AjaxStore();
