import '../../dist';
test('My Common', () => {
  let result = String.uuid()
  // console.log(result);
  // expect('Hello Carl'.contains('Hello')).toBe(true);
  expect(String.DATE().getDate()).toBeInstanceOf(Date);
});
