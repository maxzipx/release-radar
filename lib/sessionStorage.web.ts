export const sessionStorageAdapter = {
  async getItem(key: string) {
    return window.sessionStorage.getItem(key);
  },
  async removeItem(key: string) {
    window.sessionStorage.removeItem(key);
  },
  async setItem(key: string, value: string) {
    window.sessionStorage.setItem(key, value);
  },
};
