import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { BaseHeader } from './BaseHeader';

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
    <BaseHeader>
      <BaseHeader.Menu title="Очень-очень длинное название прое...">
        {menuItems.map((menuItem) => (
          <BaseHeader.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <a {...menuItemProps} href={menuItem.url}>
                {menuItem.name}
              </a>
            )}
          </BaseHeader.Menu.Item>
        ))}
        <BaseHeader.Menu.Delimiter />
        <BaseHeader.Menu.Item>
          {(menuItemProps): React.ReactNode => (
            <a {...menuItemProps} href="/">
              Выйти
            </a>
          )}
        </BaseHeader.Menu.Item>
      </BaseHeader.Menu>
      <BaseHeader.Nav navItems={navItems} activeItem={navItems[0]} onChangeItem={jest.fn()} />
    </BaseHeader>,
  );

describe('BaseHeader', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('рендерится навигация', () => {
    const header = renderComponent();

    expect(header.container.querySelector('.VegaBaseHeader__MenuWrap')).toBeInTheDocument();
    expect(header.getByText('О проекте')).toBeInTheDocument();
  });
});
