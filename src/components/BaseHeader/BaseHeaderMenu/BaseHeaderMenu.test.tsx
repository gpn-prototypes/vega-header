import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { BaseHeaderMenu } from './BaseHeaderMenu';

type BaseHeaderNavTestProps = React.ComponentProps<typeof BaseHeaderMenu>;

const menuItems = [
  { name: 'Пункт 1', url: 'url1' },
  { name: 'Пункт 2', url: 'url2', onClick: jest.fn() },
];

const defaultProps = {
  title: 'Проект',
};

const renderComponent = (
  props: Omit<BaseHeaderNavTestProps, 'children'> = defaultProps,
): RenderResult =>
  render(
    <Router>
      <BaseHeaderMenu {...props}>
        {menuItems.map((mi) => (
          <BaseHeaderMenu.Item key={mi.name}>
            {(itemProps): React.ReactNode => (
              <a onClick={itemProps.closeMenu} href={mi.url}>
                {mi.name}
              </a>
            )}
          </BaseHeaderMenu.Item>
        ))}
      </BaseHeaderMenu>
    </Router>,
  );

const getMenuList = (): HTMLElement => screen.getByRole('menu');

describe('BaseHeader', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('открывается меню', async () => {
    const menu = await renderComponent();
    const menuTrigger = await menu.getByTestId('BaseHeader:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });
  });

  test('закрывается меню при клике вне меню', async () => {
    const menu = await renderComponent({ ...defaultProps });
    const menuTrigger = await menu.getByTestId('BaseHeader:Menu:Trigger');

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
    const menuTrigger = await menu.getByTestId('BaseHeader:Menu:Trigger');

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
