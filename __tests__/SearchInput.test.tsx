import SearchInput from '@/components/SearchInput';
import { act, userEvent } from '@testing-library/react-native';
import { renderRouter, screen } from 'expo-router/testing-library';

jest.mock('expo-font', () => ({
  isLoaded: jest.fn().mockResolvedValue(true),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should update search params after debounce delay', async () => {
    const { getByPlaceholderText } = renderRouter({
      index: () => <SearchInput placeholder={'Search dog breeds'} />,
    });

    const searchInput = getByPlaceholderText('Search dog breeds');
    await userEvent.type(searchInput, 'husky');

    expect(screen).toHavePathnameWithParams('/');
    act(() => jest.advanceTimersByTime(300));
    expect(screen).toHavePathnameWithParams('/?q=husky');
  });

  it('should clear search params when clicking the clear button', async () => {
    renderRouter(
      {
        index: () => <SearchInput placeholder={'Search dog breeds'} />,
      },
      { initialUrl: '/?q=husky' }
    );

    expect(screen).toHavePathnameWithParams('/?q=husky');

    const clearButton = screen.getByLabelText('clear');
    await userEvent.press(clearButton);

    act(() => jest.advanceTimersByTime(300));
    expect(screen).toHavePathnameWithParams('/?q=');
  });
});
