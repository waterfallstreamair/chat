/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { shallow } from 'enzyme';

import H3 from 'components/H3';
import NotFound from '../index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const component = shallow(<NotFound />);
    expect(component.find(H3)).toHaveLength(1);
  });
});
