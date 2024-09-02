import {describe, expect, test} from '@jest/globals';
import { random } from '../src';
test('common', () => {
  expect(random.hash()).toBeDefined()
});
