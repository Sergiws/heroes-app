import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

const renderSearchControls = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe('SearchControls', () => {
  test('should render SearchControls with default values', () => {
    const { container } = renderSearchControls();

    expect(container).toMatchSnapshot();
  });

  test('should set input value when search param name is set', () => {
    const name = 'batman';
    renderSearchControls([`/?q=${name}`]);

    const input = screen.getByPlaceholderText(
      'Busca héroes, villanos, poderes, equipos...',
    );

    expect(input.getAttribute('value')).toBe(name);
  });

  test('should change params when input is changed and enter is pressed', () => {
    const name = 'batman';
    renderSearchControls([`/?q=${name}`]);
    const input = screen.getByPlaceholderText(
      'Busca héroes, villanos, poderes, equipos...',
    );
    expect(input.getAttribute('value')).toBe(name);

    const newName = 'superman';

    fireEvent.change(input, { target: { value: newName } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.getAttribute('value')).toBe(newName);
  });

  test('should change param strength when slider is changed', () => {
    renderSearchControls(['/?name=batman&active-accordion=advanced-filters']);
    const slider = screen.getByRole('slider');

    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });

  test('should accordion be open when active-accordion para is set', () => {
    renderSearchControls(['/?name=batman&active-accordion=advanced-filters']);
    const accordion = screen.getByTestId('accordion');

    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });

  test('should accordion be closed when active-accordion para is not set', () => {
    renderSearchControls(['/?name=batman']);
    const accordion = screen.getByTestId('accordion');

    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});
