const memoryStore = new Map<string, string>();

export const sessionStorageAdapter = {
  async getItem(key: string) {
    return memoryStore.get(key) ?? null;
  },
  async removeItem(key: string) {
    memoryStore.delete(key);
  },
  async setItem(key: string, value: string) {
    memoryStore.set(key, value);
  },
};
