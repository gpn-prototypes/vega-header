import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { HeaderNav } from './HeaderNav';

type HeaderNavTestProps = React.ComponentProps<typeof HeaderNav>;

const renderComponent = (props: Omit<HeaderNavTestProps, 'children'>): RenderResult =>
  render(<HeaderNav {...props} />);

describe('Header', () => {
  const navItems = [
    {
      name: 'Пайплайн',
      isActive: true,
    },
    {
      name: 'Ресурсная база',
    },
    {
      name: 'Геологические риски',
    },
  ];

  test('рендерится без ошибок', async () => {
    const nav = renderComponent({ navItems, onChangeItem: jest.fn() });
    const tabs = await nav.findAllByRole('tab');
    expect(tabs.length).toBe(3);
  });

  test('вызывается onChangeItem', () => {
    const onChangeItem = jest.fn();
    const nav = renderComponent({ navItems, onChangeItem });

    fireEvent.click(nav.getByText('Геологические риски'));

    expect(onChangeItem).toBeCalled();
  });
});
