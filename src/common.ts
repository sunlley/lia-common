/**
 * Generate random values
 *
 * Generate random string
 * es:
 *    random.string(10,'all')
 *    random.number(0,100)
 */
export const random = {
  string: (length: number, type?: 'all' | 'number' | 'string' | 'chars' | 'normal'): string => {
    if (length === 0) {
      length = 6;
    }
    if (!type) {
      type = 'normal';
    }
    let e = '';
    let keys = '';
    if (type === 'all') {
      keys = '!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    } else {
      if (type.indexOf('number') >= 0) {
        keys += '1234567890';
      }
      if (type.indexOf('string') >= 0) {
        keys += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      }
      if (type.indexOf('chars') >= 0) {
        keys += '!@#$%^&*()_+';
      }
      if (type.indexOf('normal') >= 0) {
        keys += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
      }
    }
    for (let o = 0; o < length; o++) {
      e += keys.charAt(Math.floor(Math.random() * keys.length));
    }
    return e;
  },
  number: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
export const delay = (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const isVaN = (value: any) => {
  return value == null || value === '';
}
export const convert = {
  toJson(payload: string): object {
    return JSON.parse(payload);
  },
  toString(payload: object): string {
    return JSON.stringify(payload);
  },
  toQueryString(payload: object): string {
    let result: string[] = [];
    if (payload) {
      for (const key in payload) {
        if (payload.hasOwnProperty(key) && (payload as any)[key] != undefined) {
          let value = (payload as any)[key];
          let type = typeof value;
          if (type === 'string' || type === 'number' || type === 'boolean') {
            result.push(`${key}=${value}`);
          } else {
            result.push(`${key}=${JSON.stringify(value)}`);
          }
        }
      }
    }
    return result.join('&');
  },
  fromQueryString(payload: string): object {
    let result: any = {};
    payload = payload.trim();
    if (payload.startsWith('?')) {
      payload = payload.substring(1);
    }
    payload.split('&').forEach((it) => {
      try {
        let [key, value] = it.split('=');
        if (value != undefined) {
          result[key] = value;
        }
      } catch (e) {}
    });
    return result;
  },
};
