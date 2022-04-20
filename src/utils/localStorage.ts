export const save = (key: string, value: string) =>
  window.localStorage.setItem(key, value);

export const load = (key: string) => window.localStorage.getItem(key);

export const remove = (key: string) => window.localStorage.removeItem(key);
