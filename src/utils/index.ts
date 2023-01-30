const set = (name: string, item: string) => localStorage.setItem(name, item);

const get = (name: string) => localStorage.getItem(name);

const remove = (name: string) => localStorage.removeItem(name);

const storage = {
  set,
  get,
  remove,
};
export default storage;
