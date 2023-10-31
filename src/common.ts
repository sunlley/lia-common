import { v1 } from 'uuid';
import md5 = require('md5');

declare global {
  // interface Object {
    // md5(): string;
  // }
  interface Date {
    format(format: string): string;
  }
  // @ts-ignore
  interface Array<T> {
    same(arr: any[]): any[];
    diff(arr: any[]): any[];
    isEmpty(): boolean;
  }

  interface String {
    isEmpty(str: string): boolean;
    contains(str: string): boolean;
    toMap(tag1: string, tag2: string): any;
    padR(count: number, tag: string): string;
    padL(count: number, tag: string): string;
    isEmail(): boolean;
    date(): Date;
    coverBN(): string;
    toJson(defaultValue: any): any;
  }
  // interface Number {
    // toFloor(fixed?: number): number;
  // }
  interface StringConstructor {
    isEmpty(str: string): boolean;
    isNotEmpty(str: string): boolean;
    isNum(str: string): boolean;
    random(length: number, allKeys: boolean): string;
    contains(str: string, rgx: string): boolean;
    uuid(): string;
    suid(): string;
    toMap(str: string, tag1: string, tag2: string): any;
    padR(str: string, count: number, tag: string): string;
    padL(str: string, count: number, tag: string): string;
    isEmail(str: string): boolean;
    coverBN(str: string): string;
    toJson(str: string, defaultValue: any): any;
    fromJson(json: any, defaultValue: string): string;
    date(str: string): Date;
    DATE(): StringDate;
  }
  interface ObjectConstructor {
    md5(data: any): string;
    isNull(data: any): boolean;
    isNtN(data: any): boolean;
    toSerialize(data: any): any;
  }
  interface ArrayConstructor {
    same(arr1: any[], arr2: any[]): any[];
    diff(arr1: any[], arr2: any[]): any[];
    isEmpty(arr: any): boolean;
  }

  interface DateConstructor {
    format(date: any, format: string): string;
  }
  interface NumberConstructor {
    toFloor(num: number, fixed?: number): number;
    randomInt(max: number,min?: number, ): number;
  }
}
declare var String: StringConstructor;
declare var Array: ArrayConstructor;
declare var Date: DateConstructor;
declare var Number: NumberConstructor;

class StringDate {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  calc(str: string) {
    if (str.contains('+')) {
      str = str.replace('+', '');
      let result = this._query_params(str);
      if (result) {
        // @ts-ignore
        this._add(result[0], result[1]);
      }
    } else if (str.contains('-')) {
      str = str.replace('-', '');
      let result = this._query_params(str);
      if (result) {
        // @ts-ignore
        this._sub(result[0], result[1]);
      }
    }
    return this;
  }

  _query_params(str: string) {
    // day year mouth hour minute second
    let index = 0;
    let unit = '';
    const units = ['day', 'year', 'mouth', 'hour', 'minute', 'second'];
    for (const key of units) {
      if (str.indexOf(key) > 0) {
        unit = key;
        index = str.indexOf(key);
      }
    }
    if (index > 0) {
      let count = 0;
      let temp = str.substr(0, index);
      try {
        count = parseInt(temp, 0);
      } catch (e) {}
      if (count > 0) {
        return [count, unit];
      }
    }
    return null;
  }

  // +
  _add(count: number, unit: string) {
    if (unit === 'day') {
      this.date.setDate(this.date.getDate() + count);
    } else if (unit === 'year') {
      this.date.setFullYear(this.date.getFullYear() + count);
    } else if (unit === 'mouth') {
      this.date.setMonth(this.date.getMonth() + count);
    } else if (unit === 'hour') {
      this.date.setHours(this.date.getHours() + count);
    } else if (unit === 'minute') {
      this.date.setMinutes(this.date.getMinutes() + count);
    } else if (unit === 'second') {
      this.date.setSeconds(this.date.getSeconds() + count);
    }
  }

  // -
  _sub(count: number, unit: string) {
    if (unit === 'day') {
      this.date.setDate(this.date.getDate() - count);
    } else if (unit === 'year') {
      this.date.setFullYear(this.date.getFullYear() - count);
    } else if (unit === 'mouth') {
      this.date.setMonth(this.date.getMonth() - count);
    } else if (unit === 'hour') {
      this.date.setHours(this.date.getHours() - count);
    } else if (unit === 'minute') {
      this.date.setMinutes(this.date.getMinutes() - count);
    } else if (unit === 'second') {
      this.date.setSeconds(this.date.getSeconds() - count);
    }
  }

  timestamp(ts: number) {
    this.date.setTime(ts);
    return this;
  }

  /**
   * @param format {string:'yyyy-MM-dd hh:mm:ss'}
   * @returns {string}
   */
  format(format: string) {
    return this.date.format(format);
  }

  getDate(timezoneOffset = false) {
    if (timezoneOffset) {
      return new Date(this.date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);
    }
    return this.date;
  }

  getMidNight(timezoneOffset = false) {
    if (timezoneOffset) {
      return new Date(
        new Date(this.format('yyyy-MM-dd 00:00:00')).getTime() + this.date.getTimezoneOffset() * 60 * 1000,
      );
    }
    return new Date(this.format('yyyy-MM-dd 00:00:00'));
  }
}

// Object.prototype.md5 = function (): string {
//   return md5(this.toString());
// };
Object.md5 = (data: any) => {
  if (!data) {
    return '';
  }
  return md5(data.toString());
};
Object.toSerialize = (data) => {
  return JSON.parse(JSON.stringify(data));
};
Object.isNull = (obj) => {
  return obj == null;
};
Object.isNtN = (obj) => {
  // @ts-ignore
  return !Object.isNull(obj);
};
// @ts-ignore
String.DATE = ()=>{return new StringDate()};
String.isEmpty = (str: string) => {
  return str == null || str === '' || typeof str !== 'string';
};
String.isNotEmpty = (str) => {
  // @ts-ignore
  return !String.isEmpty(str);
};
String.random = (length = 6, allKeys = false) => {
  let e = '';
  const keys = allKeys
    ? '!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  for (let o = 0; o < length; o++) {
    e += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return e;
};
String.isNum = (str: string) => {
  if (String.isEmpty(str)) {
    return false;
  }
  try {
    return !isNaN(Number(str));
  } catch (e) {
    return false;
  }
};
String.uuid = () => {
  return v1();
};
String.suid = () => {
  return md5(v1());
};
String.prototype.contains = function (rgx: string) {
  return this.indexOf(rgx) >= 0;
};
String.contains = (str: string, rgx: string) => {
  // @ts-ignore
  if (String.isEmpty(str)) {
    return false;
  }
  return str.contains(rgx);
};
String.prototype.toMap = function (tag1, tag2) {
  let result: any = {};
  let arr: string[] = this.split(tag1);
  // @ts-ignore
  if (!arr.isEmpty()) {
    for (let item of arr) {
      if (item.indexOf(tag2)) {
        let keyvalue = item.split(tag2);
        if (keyvalue.length > 1) {
          result[keyvalue[0].trim()] = keyvalue[1];
        }
      }
    }
  }
  return result;
};
String.toMap = (str, tag1, tag2) => {
  // @ts-ignore
  if (String.isNotEmpty(str)) {
    return str.toMap(tag1, tag2);
  }
  return null;
};
String.prototype.padR = function (count, tag) {
  let temp: string = this + '';
  for (let i = 0; i < count; i++) {
    temp += tag;
  }
  return temp;
};
String.padR = (str, count, tag) => {
  return str.padR(count, tag);
};
String.prototype.padL = function (count, tag) {
  let temp: string = this + '';
  for (let i = 0; i < count; i++) {
    temp = `${tag}${temp}`;
  }
  return temp;
};
String.padL = (str, count, tag) => {
  return str.padL(count, tag);
};
String.prototype.isEmail = function () {
  let patt1 = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$/;
  return this.match(patt1) != null;
};
String.isEmail = (str) => {
  if (!str) {
    return false;
  }
  return str.isEmail();
};
String.prototype.date = function () {
  try {
    return new Date(this + '');
  } catch (e) {
    return new Date();
  }
};
String.date = (str) => {
  if (!str) {
    return new Date();
  }
  return str.date();
};
String.prototype.coverBN = function () {
  let resValue: string = '';
  let power: any = '';
  let result = null;
  let dotIndex = 0;
  let resArr: any[] = [];
  let sym: string = '';
  let numStr: string = `${this}`;
  // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
  if ('-' === numStr[0]) {
    numStr = numStr.substr(1);
    sym = '-';
  }
  if (-1 !== numStr.indexOf('E') || numStr.indexOf('e') !== -1) {
    let regExp = new RegExp('^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$', 'ig');
    result = regExp.exec(numStr);
    if (result != null) {
      resValue = result[2];
      power = result[5];
      result = null;
    }
    if (!resValue && !power) {
      return numStr + '';
    }
    dotIndex = resValue.indexOf('.');
    resValue = resValue.replace('.', '');
    resArr = resValue.split('');
    if (Number(power) >= 0) {
      let subres = resValue.substr(dotIndex);
      power = Number(power);
      // 幂数大于小数点后面的数字位数时，后面加0
      for (let i = 0; i < power - subres.length; i++) {
        resArr.push('0');
      }
      if (power - subres.length < 0) {
        resArr.splice(dotIndex + power, 0, '.');
      }
    } else {
      power = power.replace('-', '');
      power = Number(power);
      // 幂数大于等于 小数点的index位置, 前面加0
      for (let i = 0; i <= power - dotIndex; i++) {
        resArr.unshift('0');
      }
      let n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
      resArr.splice(n, 0, '.');
    }
  } else {
    return numStr + '';
  }
  resValue = resArr.join('');
  return sym + resValue;
};
String.coverBN = (num_str) => {
  return num_str.coverBN();
};
String.prototype.toJson = function (defaultValue = {}) {
  if (this.trim().indexOf('{') === 0 || this.trim().indexOf('[') === 0) {
    return JSON.parse(this + '');
  }
  return defaultValue;
};
String.toJson = (str: string, defaultValue = {}) => {
  // @ts-ignore
  return str.toJson(defaultValue);
};
String.fromJson = (json, defaultValue = '') => {
  if (typeof json === 'string') {
    return json;
  }
  if (typeof json === 'object') {
    return JSON.stringify(json);
  }
  if (json) {
    return `${json}`;
  }
  return defaultValue;
};
Array.prototype.same = function (target) {
  const temp: any[] = [];
  if (target === null) {
    return temp;
  }
  // @ts-ignore
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.length; i++) {
    let temp1 = this[i];
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < target.length; j++) {
      let temp2 = target[j];
      if (temp1 === temp2) {
        temp.push(temp1);
      }
    }
  }
  return temp;
};
Array.same = (origin, target) => {
  if (origin === null) {
    return [];
  }
  return origin.same(target);
};
Array.prototype.diff = function (target) {
  const temp: any = [];
  if (target === null) {
    return temp;
  }
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.length; i++) {
    let temp1 = this[i];
    let isSame = false;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < target.length; j++) {
      let temp2 = target[j];
      if (temp1 === temp2) {
        isSame = true;
      }
    }
    if (!isSame) {
      temp.push(temp1);
    }
  }
  return temp;
};
Array.diff = (origin, target) => {
  if (origin === null) {
    return [];
  }
  return origin.diff(target);
};
Array.prototype.isEmpty = function () {
  return this.length <= 0;
};
Array.isEmpty = (obj) => {
  return !obj || !Array.isArray(obj) || obj.length <= 0;
};
Date.prototype.format = function (format) {
  if (format == null || format === '') {
    format = 'yyyy-MM-dd hh:mm:ss';
  }
  let f = format;
  let o = {
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(f)) {
    f = f.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(f)) {
      // @ts-ignore
      f = f.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return f;
};
Date.format = (ts, format) => {
  if (ts instanceof Date) {
    // @ts-ignore
    return ts.format(format);
  }
  // @ts-ignore
  return new Date(ts).format(format);
};

Number.toFloor = (num, fixed = 0) => {
  let str: string = `${num}`;
  if (!str.contains('.')) {
    return num;
  }
  let strArr = str.split('.');
  let start = strArr[0];
  let end = strArr[1];
  if (end.length > fixed) {
    end = end.substr(0, fixed);
  }
  if (fixed <= 0) {
    return parseInt(`${start}.${end}`, 0);
  }
  return parseFloat(`${start}.${end}`);
};
Number.randomInt = (max, min=0) => {
  if (min==null){min=0;}
  if (max<min){
    throw new Error('Max must upper min');
  }
  return Math.floor(Math.random() * (max-min)+min);
}
export default {};
