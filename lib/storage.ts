import AsyncStorage from '@react-native-async-storage/async-storage';

const WATCHLIST_KEY = '@release_radar_watchlist';

export async function getWatchlist(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get watchlist from storage', error);
    return [];
  }
}

export async function setWatchlist(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Failed to set watchlist in storage', error);
  }
}

export async function addToWatchlist(id: string): Promise<void> {
  const current = await getWatchlist();
  if (!current.includes(id)) {
    await setWatchlist([...current, id]);
  }
}

export async function removeFromWatchlist(id: string): Promise<void> {
  const current = await getWatchlist();
  await setWatchlist(current.filter((item) => item !== id));
}
