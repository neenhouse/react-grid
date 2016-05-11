import GridHead from './gridhead';

import { mount, shallow } from 'enzyme';

var props = {
  ...GridHead.defaultProps,
  columnHeaders:[]
};

describe('<GridHead />', function() {
  it("Render <GridHead /> with defaults", function () {
    expect(shallow(<GridHead {...props} />).is('.grid-header')).to.equal(true);
  });
});
