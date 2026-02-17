import { fireEvent, screen } from '@testing-library/dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { usePaginatedHeroes } from '@/heroes/hooks/usePaginatedHeroes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteHeroContextProvider } from '@/heroes/context/FavoriteHeroContext';

vi.mock('@/heroes/hooks/usePaginatedHeroes');

const mockUsePaginatedHeroes = vi.mocked(usePaginatedHeroes);

mockUsePaginatedHeroes.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHeroes>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroContextProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroContextProvider>
    </MemoryRouter>,
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render HomePage with default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call usePaginatedHeroes with default values', () => {
    renderHomePage();
    expect(mockUsePaginatedHeroes).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call usePaginatedHeroes with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villains']);
    expect(mockUsePaginatedHeroes).toHaveBeenCalledWith(2, 10, 'villains');
  });

  test('should call usePaginatedHero with default page and same limir on tab clicked', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);

    const [, , , villainsTab] = screen.getAllByRole('tab');

    fireEvent.click(villainsTab);

    expect(mockUsePaginatedHeroes).toHaveBeenCalledWith(1, 10, 'villain');
  });
});
