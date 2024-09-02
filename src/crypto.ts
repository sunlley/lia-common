import cryptojs from 'crypto-js';

export const AES={
  encrypt(data: string, key: string,iv?:string): string {
    if (iv){
      let key_ = CryptoJS.enc.Hex.parse(key);
      let iv_ = CryptoJS.enc.Hex.parse(iv);
      return cryptojs.AES.encrypt(data, key_,{
        iv:iv_
      }).toString();
    }else {
      return cryptojs.AES.encrypt(data, key).toString();
    }
  },
  decrypt(data: string, key: string,iv?:string): string {
    if (iv){
      let key_ = CryptoJS.enc.Hex.parse(key);
      let iv_ = CryptoJS.enc.Hex.parse(iv);
      return cryptojs.AES.decrypt(data, key_,{
        iv:iv_
      }).toString(cryptojs.enc.Utf8);
    }else {
      return cryptojs.AES.decrypt(data, key).toString(cryptojs.enc.Utf8);
    }
  },
}
export const DES={
  encrypt(data: string, key: string): string {
    return cryptojs.DES.encrypt(data, key).toString();
  },
  decrypt(data: string, key: string): string {
    return cryptojs.DES.decrypt(data, key).toString(cryptojs.enc.Utf8);
  },
}
export const Rabbit={
  encrypt(data: string, key: string): string {
    return cryptojs.Rabbit.encrypt(data, key).toString();
  },
  decrypt(data: string, key: string): string {
    return cryptojs.Rabbit.decrypt(data, key).toString(cryptojs.enc.Utf8);
  },
}
export const RC4={
  encrypt(data: string, key: string): string {
    return cryptojs.RC4.encrypt(data, key).toString();
  },
  decrypt(data: string, key: string): string {
    return cryptojs.RC4.decrypt(data, key).toString(cryptojs.enc.Utf8);
  },
}
export const RC4Drop={
  encrypt(data: string, key: string): string {
    return cryptojs.RC4Drop.encrypt(data, key).toString();
  },
  decrypt(data: string, key: string): string {
    return cryptojs.RC4Drop.decrypt(data, key).toString(cryptojs.enc.Utf8);
  },
}

export const CryptoJS = cryptojs;