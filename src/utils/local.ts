export function save(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get(key: string) {
  const localStr = localStorage.getItem(key);
  return localStr ? JSON.parse(localStr) : null;
}

export const local = {
  save,
  get,
};

export default local;
