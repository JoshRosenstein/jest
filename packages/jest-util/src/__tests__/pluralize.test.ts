import pluralize from '../pluralize';

describe('.pluralize()', () => {
  test('one', () => expect(pluralize('apple', 1)).toEqual('one apple'));
  test('two', () => expect(pluralize('apple', 2)).toEqual('two apples'));
  test('20', () => expect(pluralize('apple', 20)).toEqual('20 apples'));
  test('ending', () =>
    expect(pluralize('match', 20, 'es')).toEqual('20 matches'));
});
