import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Share } from 'react-native';

import { ReleaseCard } from '@/components/release/ReleaseCard';
import { releases } from '@/data/releases';
import { WatchlistProvider } from '@/hooks/useWatchlist';

describe('ReleaseCard', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.spyOn(Share, 'share').mockResolvedValue({ action: 'sharedAction' as never });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('expands inline details when pressed', async () => {
    render(
      <WatchlistProvider>
        <ReleaseCard release={releases[0]} />
      </WatchlistProvider>
    );

    fireEvent.press(await screen.findByLabelText('Mickey 17 release card'));

    expect(screen.getByText(/A buzzy auteur project/i)).toBeTruthy();
    expect(screen.getByText('Sci-Fi • Thriller')).toBeTruthy();
  });

  it('shows a pending trailer state when no URL is present', async () => {
    render(
      <WatchlistProvider>
        <ReleaseCard release={releases[0]} />
      </WatchlistProvider>
    );

    fireEvent.press(await screen.findByLabelText('Mickey 17 release card'));

    expect(screen.getByText('Trailer pending')).toBeTruthy();
  });

  it('saves and unsaves a release from My Radar', async () => {
    render(
      <WatchlistProvider>
        <ReleaseCard release={releases[0]} />
      </WatchlistProvider>
    );

    fireEvent.press(await screen.findByLabelText('Mickey 17 release card'));
    fireEvent.press(await screen.findByLabelText('Save Mickey 17 to My Radar'));

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeTruthy();
    });

    expect(await AsyncStorage.getItem('@release_radar_watchlist')).toBe(JSON.stringify(['mickey-17']));

    fireEvent.press(screen.getByLabelText('Remove Mickey 17 from My Radar'));

    await waitFor(() => {
      expect(screen.getByText('Save')).toBeTruthy();
    });
  });
});
