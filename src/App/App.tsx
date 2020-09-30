import React, { ReactElement } from 'react';
import { BrowserRouter, Link, useHistory, useLocation } from 'react-router-dom';
import { Header, NavItemType, Root as VegaRoot, Text } from '@gpn-prototypes/vega-ui';

import './App.css';

interface NavLinkType extends NavItemType {
  url?: string;
}

const VegaHeader = () => {
  const history = useHistory();
  const location = useLocation();

  const navItems: NavLinkType[] = [
    {
      name: 'Экономика проекта',
      url: '/fem',
      isActive: location.pathname.startsWith('/fem'),
    },
    {
      name: 'Логика проекта',
      url: '/logic',
      isActive: location.pathname.startsWith('/logic'),
    },
  ];

  const menuItems = [
    { name: 'Проекты', url: '/projects' },
    { name: 'Обучение', url: '/' },
    { name: 'Помощь', url: '/help' },
  ];

  const activeItem = navItems.find((ni) => ni.isActive);

  const handleChangeActive = (item: NavLinkType): void => {
    if (item.url) {
      history.push(item.url);
    }
  };

  return (
    <Header>
      <Header.Menu title="Вега">
        {menuItems.map((menuItem) => (
          <Header.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <Link
                onClick={menuItemProps.closeMenu}
                className={menuItemProps.className}
                to={menuItem.url}
              >
                <Text>{menuItem.name}</Text>
              </Link>
            )}
          </Header.Menu.Item>
        ))}
        <Header.Menu.Delimiter />
        <Header.Menu.Item>
          {(menuItemProps): React.ReactNode => (
            <Link onClick={menuItemProps.closeMenu} className={menuItemProps.className} to="/login">
              <Text>Выйти</Text>
            </Link>
          )}
        </Header.Menu.Item>
      </Header.Menu>
      <Header.Nav activeItem={activeItem} navItems={navItems} onChangeItem={handleChangeActive} />
    </Header>
  );
};

export const App = (): ReactElement => {
  return (
    <BrowserRouter basename="/">
      <VegaRoot defaultTheme="dark">
        <VegaHeader />
      </VegaRoot>
    </BrowserRouter>
  );
};
