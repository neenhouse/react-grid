import Footer from './foot';

import { mount, shallow } from 'enzyme';

var props = {
  total:100,
  first:0,
  pages:10,
  items:10,
  index:0,
  increments:[10, 20, 50, 100]
};

describe('<Footer />', function() {
  it("Render <Footer /> with total", function () {
    expect(shallow(<Footer {...props} />).is('.grid-footer')).to.equal(true);
  });
});
