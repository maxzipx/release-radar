import { fireEvent, render, screen } from '@testing-library/react-native';

import { ReleaseCard } from '@/components/release/ReleaseCard';
import { releases } from '@/data/releases';

describe('ReleaseCard', () => {
  it('expands inline details when pressed', () => {
    render(<ReleaseCard release={releases[0]} />);

    fireEvent.press(screen.getByLabelText('Mickey 17 release card'));

    expect(screen.getByText(/A buzzy auteur project/i)).toBeTruthy();
    expect(screen.getByText('Sci-Fi • Thriller')).toBeTruthy();
  });

  it('shows a pending trailer state when no URL is present', () => {
    render(<ReleaseCard release={releases[0]} />);

    fireEvent.press(screen.getByLabelText('Mickey 17 release card'));

    expect(screen.getByText('Trailer pending')).toBeTruthy();
  });
});
