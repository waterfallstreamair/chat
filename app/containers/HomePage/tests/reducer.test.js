import { fromJS } from 'immutable';

import homeReducer from '../reducer';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      agencies: null,
      categories: null,
      prices: null,
      filtered: null,
      agencyId: null,
      isValid: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });
});
