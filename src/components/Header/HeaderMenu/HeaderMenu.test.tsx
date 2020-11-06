import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { HeaderMenu } from './HeaderMenu';

type HeaderNavTestProps = React.ComponentProps<typeof HeaderMenu>;

const menuItems = [
  { name: 'Пункт 1', url: 'url1' },
  { name: 'Пункт 2', url: 'url2', onClick: jest.fn() },
];

const defaultProps = {
  title: 'Проект',
};

const renderComponent = (
  props: Omit<HeaderNavTestProps, 'children'> = defaultProps,
): RenderResult =>
  render(
    <HeaderMenu {...props}>
      {menuItems.map((mi) => (
        <HeaderMenu.Item key={mi.name}>
          {(itemProps): React.ReactNode => (
            <a onClick={itemProps.closeMenu} href={mi.url}>
              {mi.name}
            </a>
          )}
        </HeaderMenu.Item>
      ))}
    </HeaderMenu>,
  );

const getMenuList = (): HTMLElement => screen.getByRole('menu');

describe('Header', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('открывается меню', async () => {
    const menu = await renderComponent();
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });
  });

  test('закрывается меню при клике вне меню', async () => {
    const menu = await renderComponent({ ...defaultProps });
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });

    fireEvent.click(menu.getByText('Проект'));

    await waitFor(() => {
      expect(menu.container.querySelector('[role="menu"]')).toBe(null);
    });
  });

  test('вызывается callback функция', async () => {
    const menu = await renderComponent();
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });

    const menuItem = await screen.getByText('Пункт 2');

    fireEvent.click(menuItem);

    await waitFor(() => {
      expect(menu.container.querySelector('[role="menu"]')).toBe(null);
    });
  });
});
