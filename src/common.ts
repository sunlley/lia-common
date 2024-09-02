import cryptojs from 'crypto-js';

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
  hash: (option?: {
    engine?: 'pbkdf2' | 'sha1' | 'sha3' | 'sha256';
    enc?: 'base64' | 'hex';
    length?: 128 | 256 | 512;
  }): string => {
    let { enc, engine, length } = option ?? {};
    engine = engine ?? 'pbkdf2';
    length = length ?? 128;
    enc = enc ?? 'base64';
    let salt = cryptojs.lib.WordArray.random(length / 8);

    switch (engine) {
      case 'pbkdf2':
        return cryptojs.PBKDF2(salt, salt, {
          keySize: length / 32,
        }).toString(enc == 'base64' ? cryptojs.enc.Base64 : cryptojs.enc.Hex);
      case 'sha1':
        return cryptojs.SHA1(salt).toString(enc == 'base64' ? cryptojs.enc.Base64 : cryptojs.enc.Hex);
      case 'sha3':
        return cryptojs.SHA3(salt).toString(enc == 'base64' ? cryptojs.enc.Base64 : cryptojs.enc.Hex);
      case 'sha256':
        return cryptojs.SHA256(salt).toString(enc == 'base64' ? cryptojs.enc.Base64 : cryptojs.enc.Hex);
    }

    return '';
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
};
export const convert = {
  toJson(payload: string): object {
    return JSON.parse(payload);
  },
  toString(payload: object): string {
    return JSON.stringify(payload);
  },
  toQueryString(payload: { [key: string]: any }, prefix?: string): string {
    prefix = prefix || '';
    let pairs = [];

    for (let key in payload) {
      if (key === null) {
        continue;
      }
      let value = payload[key];
      if (value == undefined) {
        continue;
      }
      let key_ = this.encodeURI(key);
      if (key_ == null) {
        continue;
      }
      value = this.encodeURI(value);
      pairs.push(key_ + '=' + value);
    }

    return pairs.length ? prefix + pairs.join('&') : '';
  },
  fromQueryString(payload: string): { [key: string]: any } {
    if (payload.indexOf('?') >= 0) {
      payload = payload.substring(payload.indexOf('?'));
    }
    let parser = /([^=?#&]+)=?([^&]*)/g;
    let result: any = {};
    let part: any;

    // eslint-disable-next-line no-cond-assign
    while ((part = parser.exec(payload))) {
      let key = this.decodeURI(part[1]),
        value = this.decodeURI(part[2]);

      //
      // Prevent overriding of existing properties. This ensures that build-in
      // methods like `toString` or __proto__ are not overriden by malicious
      // querystrings.
      //
      // In the case if failed decoding, we want to omit the key/value pairs
      // from the result.
      //
      if (key === null || value === null || key in result) {
        continue;
      }
      result[key] = value;
    }

    return result;
  },

  /**
   * Decode a URI encoded string.
   *
   * @param {String} input The URI encoded string.
   * @returns {String|Null} The decoded string.
   * @api private
   */
  decodeURI(input: string): string | null {
    try {
      return decodeURIComponent(input.replace(/\+/g, ' '));
    } catch (e) {
      return null;
    }
  },

  /**
   * Attempts to encode a given input.
   *
   * @param {String} input The string that needs to be encoded.
   * @returns {String|Null} The encoded string.
   * @api private
   */
  encodeURI(input: string): string | null {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      return null;
    }
  },
};
