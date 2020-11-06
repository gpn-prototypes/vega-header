import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Header } from './Header';

const navItems = [
  {
    name: 'О проекте',
    isActive: true,
  },
  {
    name: 'Ресурсная база',
  },
  {
    name: 'Геологические риски',
  },
];

const menuItems = [
  { name: 'Проекты', url: '' },
  { name: 'Обучение', url: '' },
  { name: 'Помощь', url: '' },
];

const renderComponent = (): RenderResult =>
  render(
    <Header>
      <Header.Menu title="Очень-очень длинное название прое...">
        {menuItems.map((menuItem) => (
          <Header.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <a {...menuItemProps} href={menuItem.url}>
                {menuItem.name}
              </a>
            )}
          </Header.Menu.Item>
        ))}
        <Header.Menu.Delimiter />
        <Header.Menu.Item>
          {(menuItemProps): React.ReactNode => (
            <a {...menuItemProps} href="/">
              Выйти
            </a>
          )}
        </Header.Menu.Item>
      </Header.Menu>
      <Header.Nav navItems={navItems} activeItem={[navItems[0]]} onChangeItem={jest.fn()} />
    </Header>,
  );

describe('Header', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('рендерится навигация', () => {
    const header = renderComponent();

    expect(header.container.querySelector('.VegaHeader__MenuWrap')).toBeInTheDocument();
    expect(header.getByText('О проекте')).toBeInTheDocument();
  });
});
