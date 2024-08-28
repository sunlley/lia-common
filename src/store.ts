const DEFAULT_MAX_AGE = Infinity;
type CacheItem = {
  timestamp: number;
  validUntilTimestamp: number;
  value?: any;
};

let _DATA: WeakMap<CacheItem, any>;
let KEYS: Record<string, CacheItem | null>;
let LINKED: {
  action: string;
  key: string;
  task: any;
}[];

const loop = () => {
  while (LINKED.length > 0) {
    const item = LINKED.pop();
    item?.task();
  }
};
const check_store = () => {
  if (_DATA==undefined) {
    _DATA = new WeakMap();
    KEYS = {};
    LINKED = [];
  }
}

const gen_key = (key: string, maxAge?: number | null): CacheItem => {
  check_store();
  const validTime = Date.now() + (maxAge ? maxAge : DEFAULT_MAX_AGE);
  return {
    timestamp: Date.now(),
    validUntilTimestamp: validTime,
    value: key,
  };
};
const push = async (key: string, value: any, maxAge?: number | null): Promise<boolean> => {
  check_store();
  return new Promise((resolve, reject) => {
    LINKED.push({
      action: 'push',
      key,
      task: () => {
        let linked_key = KEYS[key];
        if (!linked_key) {
          linked_key = gen_key(key, maxAge);
        } else {
          linked_key.timestamp = Date.now();
          linked_key.validUntilTimestamp = Date.now() + (maxAge ? maxAge : DEFAULT_MAX_AGE);
        }
        KEYS[key] = linked_key;
        _DATA.set(linked_key, value);
        resolve(true);
      },
    });
    loop();
  });
};
const find = async <T = any>(key: string): Promise<T | undefined> => {
  check_store();
  return new Promise<T | undefined>((resolve, reject) => {
    LINKED.push({
      action: 'find',
      key,
      task: () => {
        let linked_key = KEYS[key];
        if (!linked_key) {
          resolve(undefined);
          return;
        }
        let now = Date.now();
        if (now > linked_key.validUntilTimestamp) {
          KEYS[key] = null;
          _DATA.delete(linked_key);
          resolve(undefined);
          return;
        }
        resolve(_DATA.get(linked_key));
      },
    });
    loop();
  });
};
const remove = async (key: string): Promise<boolean> => {
  check_store();
  return new Promise((resolve, reject) => {
    LINKED.push({
      action: 'remove',
      key,
      task: () => {
        let linked_key = KEYS[key];
        if (!linked_key) {
          resolve(true);
          return;
        }
        KEYS[key] = null;
        _DATA.delete(linked_key);
        resolve(true);
      },
    });
    loop();
  });
};

export const Store = {
  push,
  find,
  remove,
};
