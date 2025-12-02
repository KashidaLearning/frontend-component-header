import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Local Components
import MobileUserMenuToggleSlot from '../plugin-slots/MobileUserMenuToggleSlot';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import LogoSlot from '../plugin-slots/LogoSlot';
import MobileLoggedOutItemsSlot from '../plugin-slots/MobileLoggedOutItemsSlot';
import { mobileHeaderLoggedOutItemsDataShape } from './MobileLoggedOutItems';
import MobileMainMenuSlot from '../plugin-slots/MobileMainMenuSlot';
import { mobileHeaderMainMenuDataShape } from './MobileHeaderMainMenu';
import MobileUserMenuSlot from '../plugin-slots/MobileUserMenuSlot';
import { mobileHeaderUserMenuDataShape } from './MobileHeaderUserMenu';

// i18n
import messages from '../Header.messages';

// Assets
import { MenuIcon } from '../Icons';

class MobileHeader extends React.Component {
  constructor(props) { // eslint-disable-line @typescript-eslint/no-useless-constructor
    super(props);
  }

  // Combined menu: main + secondary + user/logged-out
  renderCombinedMenu() {
    const {
      mainMenu,
      secondaryMenu,
      userMenu,
      loggedOutItems,
      loggedIn,
    } = this.props;

    const combinedMain = [...mainMenu, ...secondaryMenu];

    return (
      <>
        {/* Main + secondary items */}
        {combinedMain.length > 0 && (
          <MobileMainMenuSlot menu={combinedMain} />
        )}

        {/* Divider between main and user section (optional) */}
        {(combinedMain.length > 0 && (userMenu.length > 0 || loggedOutItems.length > 0)) && (
          <hr className="my-2" />
        )}

        {/* User section (profile links OR login/register) */}
        {loggedIn ? (
          <MobileUserMenuSlot menu={userMenu} />
        ) : (
          <MobileLoggedOutItemsSlot items={loggedOutItems} />
        )}
      </>
    );
  }

  // Kept in case you still want the avatar toggle somewhere else later
  renderUserMenuToggle() {
    const { avatar, username } = this.props;
    return <MobileUserMenuToggleSlot avatar={avatar} label={username} />;
  }

  render() {
    const {
      logo,
      logoAltText,
      logoDestination,
      loggedIn,
      stickyOnMobile,
      intl,
      mainMenu,
      userMenu,
      loggedOutItems,
    } = this.props;

    const logoProps = { src: logo, alt: logoAltText, href: logoDestination };
    const stickyClassName = stickyOnMobile ? 'sticky-top' : '';
    const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'justify-content-left pl-3' : 'justify-content-center';

    const hasAnyMenuItems =
      mainMenu.length > 0 ||
      userMenu.length > 0 ||
      loggedOutItems.length > 0;

    return (
      <header
        aria-label={intl.formatMessage(messages['header.label.main.header'])}
        className={`site-header-mobile d-flex justify-content-between align-items-center shadow ${stickyClassName}`}
      >
        <a className="nav-skip sr-only sr-only-focusable" href="#main">
          {intl.formatMessage(messages['header.label.skip.nav'])}
        </a>

        {/* SINGLE combined menu on the left */}
        {hasAnyMenuItems && (
          <div className="w-100 d-flex justify-content-start">
            <Menu className="position-static">
              <MenuTrigger
                tag="button"
                className="icon-button"
                aria-label={intl.formatMessage(messages['header.label.main.menu'])}
                title={intl.formatMessage(messages['header.label.main.menu'])}
              >
                <MenuIcon
                  role="img"
                  aria-hidden
                  focusable="false"
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
              </MenuTrigger>
              <MenuContent
                tag="nav"
                aria-label={intl.formatMessage(messages['header.label.main.nav'])}
                className="nav flex-column pin-left pin-right border-top shadow py-2"
              >
                {this.renderCombinedMenu()}
              </MenuContent>
            </Menu>
          </div>
        )}

        {/* Logo in the center */}
        <div className={`w-100 d-flex justify-content-end`}>
          <LogoSlot {...logoProps} itemType="http://schema.org/Organization" />
        </div>
      </header>
    );
  }
}

export const mobileHeaderDataShape = {
  mainMenu: mobileHeaderMainMenuDataShape,
  secondaryMenu: mobileHeaderMainMenuDataShape,
  userMenu: mobileHeaderUserMenuDataShape,
  loggedOutItems: mobileHeaderLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  stickyOnMobile: PropTypes.bool,
};

MobileHeader.propTypes = {
  mainMenu: mobileHeaderDataShape.mainMenu,
  secondaryMenu: mobileHeaderDataShape.secondaryMenu,
  userMenu: mobileHeaderDataShape.userMenu,
  loggedOutItems: mobileHeaderDataShape.loggedOutItems,
  logo: mobileHeaderDataShape.logo,
  logoAltText: mobileHeaderDataShape.logoAltText,
  logoDestination: mobileHeaderDataShape.logoDestination,
  avatar: mobileHeaderDataShape.avatar,
  username: mobileHeaderDataShape.username,
  loggedIn: mobileHeaderDataShape.loggedIn,
  stickyOnMobile: mobileHeaderDataShape.stickyOnMobile,

  // i18n
  intl: intlShape.isRequired,
};

MobileHeader.defaultProps = {
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
  stickyOnMobile: true,
};

export default injectIntl(MobileHeader);
