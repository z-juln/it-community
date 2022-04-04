export function save(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get(key: string) {
  const localStr = localStorage.getItem(key);
  return localStr ? JSON.parse(localStr) : null;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}

export const local = {
  save,
  get,
  remove,
};

export default local;
