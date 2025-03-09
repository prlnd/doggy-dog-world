import FilterChips from '@/components/FilterChips';
import { Breed } from '@/schemas/breeds';
import { userEvent } from '@testing-library/react-native';
import { renderRouter, screen } from 'expo-router/testing-library';

jest.mock('expo-font', () => ({
  isLoaded: jest.fn().mockResolvedValue(true),
  loadAsync: jest.fn().mockResolvedValue(true),
  loadedFonts: [],
}));

const mockBreeds: Breed[] = [
  {
    id: 1,
    name: 'Husky',
    weight: { metric: '20 - 27' },
    height: { metric: '51 - 60', min: 51, max: 60, size: 'Large' },
    temperament: 'Friendly, Active, Athletic',
    origin: ['Russia'],
    imageId: 'S1nhWx94m',
    lifeSpan: '12 - 14 years',
  },
  {
    id: 2,
    name: 'Chihuahua',
    weight: { metric: '1 - 3' },
    height: { metric: '15 - 23', min: 15, max: 23, size: 'Small' },
    temperament: 'Alert, Quick, Courageous',
    origin: ['Mexico'],
    imageId: 'BkZ4By5VX',
    lifeSpan: '12 - 20 years',
  },
];

describe('FilterChips', () => {
  it('should update size filter when clicking size chips', async () => {
    renderRouter({
      index: () => <FilterChips breeds={mockBreeds} />,
    });

    const smallChip = screen.getByRole('button', { name: 'Small' });
    await userEvent.press(smallChip);
    expect(screen).toHavePathnameWithParams('/?size=Small');

    const largeChip = screen.getByRole('button', { name: 'Large' });
    await userEvent.press(largeChip);
    expect(screen).toHavePathnameWithParams('/?size=Small&size=Large');

    await userEvent.press(smallChip);
    expect(screen).toHavePathnameWithParams('/?size=Large');

    await userEvent.press(largeChip);
    expect(screen).toHavePathnameWithParams('/');
  });

  it('should update origin filter when clicking origin chips', async () => {
    renderRouter({
      index: () => <FilterChips breeds={mockBreeds} />,
    });

    const russiaChip = screen.getByRole('button', { name: 'Russia' });
    await userEvent.press(russiaChip);
    expect(screen).toHavePathnameWithParams('/?origin=Russia');

    const mexicoChip = screen.getByRole('button', { name: 'Mexico' });
    await userEvent.press(mexicoChip);
    expect(screen).toHavePathnameWithParams('/?origin=Russia&origin=Mexico');

    await userEvent.press(russiaChip);
    expect(screen).toHavePathnameWithParams('/?origin=Mexico');

    await userEvent.press(mexicoChip);
    expect(screen).toHavePathnameWithParams('/');
  });

  it('should clear filters on long press', async () => {
    renderRouter(
      {
        index: () => <FilterChips breeds={mockBreeds} />,
      },
      { initialUrl: '/?size=Small&size=Large&origin=Russia&origin=Mexico' }
    );

    const smallChip = screen.getByRole('button', { name: 'Small' });
    await userEvent.longPress(smallChip);
    expect(screen).toHavePathnameWithParams('/?origin=Russia&origin=Mexico');

    const russiaChip = screen.getByRole('button', { name: 'Russia' });
    await userEvent.longPress(russiaChip);
    expect(screen).toHavePathnameWithParams('/');
  });
});
