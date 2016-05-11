import GridBody from './gridbody';

import { mount, shallow } from 'enzyme';

var props = {
  ...GridBody.defaultProps,
  data:[]
}

describe('<GridBody />', function() {
  it("Render <GridBody /> with defaults", function () {
    expect(shallow(<GridBody {...props} />).is('.grid-body')).to.equal(true);
  });
});
