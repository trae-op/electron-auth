type TStore = {
  [key: string]: any | undefined;
};

const store = new Map<keyof TStore, TStore[keyof TStore]>();

export function getStore<K extends keyof TStore>(key: K) {
  return store.get(key) as TStore[K] | undefined;
}

export function hasStore<K extends keyof TStore>(name: K) {
  return store.has(name);
}

export function setStore<K extends keyof TStore>(name: K, value: TStore[K]) {
  store.set(name, value);
}

export function clearStore() {
  store.clear();
}
