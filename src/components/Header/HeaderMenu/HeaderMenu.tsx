import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { IconHamburger } from '@gpn-prototypes/vega-icons';
import { Text } from '@gpn-prototypes/vega-text';

import { cnHeader } from '../cn-header';

import { HeaderMenuContext } from './HeaderMenuContext';
import { HeaderMenuDelimiter } from './HeaderMenuDelimiter';
import { HeaderMenuItem } from './HeaderMenuItem';

interface HeaderMenuProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const testId = {
  trigger: 'Header:Menu:Trigger',
};

type HeaderMenuType = React.FC<HeaderMenuProps> & {
  Delimiter: typeof HeaderMenuDelimiter;
  Item: typeof HeaderMenuItem;
};

export const HeaderMenu: HeaderMenuType = (props) => {
  const { title, children, className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = (): void => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <HeaderMenuContext.Provider value={{ closeMenu: handleCloseMenu }}>
      <div className={cnHeader('MenuWrap').mix(className)} role="menubar">
        <Dropdown
          isOpen={isOpen}
          aria-expanded={isOpen}
          aria-hidden={!isOpen}
          aria-haspopup="true"
          aria-labelledby="headerMenuTrigger"
          onToggle={(nextState): void => {
            setIsOpen(nextState);
          }}
          onClickOutside={handleCloseMenu}
          placement="bottom-start"
        >
          <Dropdown.Trigger>
            {({ toggle, props: triggerProps }): React.ReactNode => (
              <div className={cnHeader('MenuTrigger')} {...triggerProps}>
                <Button
                  id="headerMenuTrigger"
                  size="m"
                  view="clear"
                  type="button"
                  onlyIcon
                  onClick={toggle}
                  iconLeft={IconHamburger}
                  form="brick"
                  data-testid={testId.trigger}
                />
              </div>
            )}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {({ props: menuProps }): React.ReactNode => (
              <div className={cnHeader('Dropdown')} {...menuProps}>
                <ul className={cnHeader('Menu')} role="menu">
                  {children}
                </ul>
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Text className={cnHeader('MenuTriggerText').toString()}>{title}</Text>
      </div>
    </HeaderMenuContext.Provider>
  );
};

HeaderMenu.Delimiter = HeaderMenuDelimiter;
HeaderMenu.Item = HeaderMenuItem;
