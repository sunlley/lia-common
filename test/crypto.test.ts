import {describe, expect, test,beforeAll,it} from '@jest/globals';
import { AES, random } from '../src';
describe('crypto', () => {
  let key = random.hash();
  let iv = random.hash();
  let message='Hello Lia';
  let message2:string;
  beforeAll(()=>{
    message2=AES.encrypt(message,key,iv);
  })
  it('AES',()=>{
    expect(AES.decrypt(message2,key,iv)).toMatch('Lia');
  })
});
