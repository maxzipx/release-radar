import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, screen, waitFor } from '@testing-library/react-native';

import MyRadarScreen from '@/app/(tabs)/my-radar';
import { WatchlistProvider } from '@/hooks/useWatchlist';

describe('MyRadarScreen', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('shows the empty state with no saved releases', async () => {
    render(
      <WatchlistProvider>
        <MyRadarScreen />
      </WatchlistProvider>
    );

    expect(await screen.findByText('Nothing on your radar yet')).toBeTruthy();
  });

  it('shows saved releases after watchlist hydration', async () => {
    await AsyncStorage.setItem('@release_radar_watchlist', JSON.stringify(['mickey-17']));

    render(
      <WatchlistProvider>
        <MyRadarScreen />
      </WatchlistProvider>
    );

    expect(await screen.findByLabelText('Mickey 17 release card')).toBeTruthy();
  });
});
