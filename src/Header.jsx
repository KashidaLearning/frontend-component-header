import React, { useContext } from 'react';
import Responsive from 'react-responsive';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import PropTypes from 'prop-types';
import DesktopHeaderSlot from './plugin-slots/DesktopHeaderSlot';
import MobileHeaderSlot from './plugin-slots/MobileHeaderSlot';

import messages from './Header.messages';
import RowadHeader from './rowad/RowadHeader';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

/**
 * Header component for the application.
 * Displays a header with the provided main menu, secondary menu, and user menu when the user is authenticated.
 * If any of the props (mainMenuItems, secondaryMenuItems, userMenuItems) are not provided, default
 * items are displayed.
 * For more details on how to use this component, please refer to this document:
 * https://github.com/openedx/frontend-component-header/blob/master/docs/using_custom_header.rst
 *
 * @param {list} mainMenuItems - The list of main menu items to display.
 * See the documentation for the structure of main menu item.
 * @param {list} secondaryMenuItems - The list of secondary menu items to display.
 * See the documentation for the structure of secondary menu item.
 * @param {list} userMenuItems - The list of user menu items to display.
 * See the documentation for the structure of user menu item.
 */
const Header = ({
  mainMenuItems, secondaryMenuItems, userMenuItems,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const intl = useIntl();

  const rowadWebsiteUrl = 'https://d1p65zue2xzvrm.cloudfront.net';

  const submenuLink = (href, label) => (
    <a
      className="rowad-submenu-link"
      href={href}
      key={label}
    >
      {label}
    </a>
  );

  const defaultMainMenu = [
    {
      type: 'menu',
      href: `${rowadWebsiteUrl}/explore.html`,
      content: 'Explore',
      submenuContent: (
        <div className="rowad-mega-menu">
          <div className="rowad-menu-column">
            <h3>Content</h3>

            {submenuLink(`${rowadWebsiteUrl}/courses.html`, 'Courses')}
            {submenuLink(`${rowadWebsiteUrl}/podcasts.html`, 'Podcasts')}
            {submenuLink(`${rowadWebsiteUrl}/blogs.html`, 'Blogs')}
          </div>

          <div className="rowad-menu-column">
            <h3>Programs & Support</h3>

            {submenuLink(`${rowadWebsiteUrl}/mentorship.html`, 'Mentorship Program')}
            {submenuLink(`${rowadWebsiteUrl}/consultation.html`, 'Consultation Support')}
            {submenuLink(`${rowadWebsiteUrl}/partnerships.html`, 'Partnerships')}
            {submenuLink(`${rowadWebsiteUrl}/initiatives.html`, 'Initiatives')}
            {submenuLink(`${rowadWebsiteUrl}/book-club.html`, 'Book Club')}
          </div>

          <div className="rowad-menu-column">
            <h3>Directories</h3>

            {submenuLink(`${rowadWebsiteUrl}/glossary.html`, 'Glossary')}
            {submenuLink(`${rowadWebsiteUrl}/tools-directory.html`, 'Tools Directory')}
            {submenuLink(`${rowadWebsiteUrl}/funding-directory.html`, 'Funding Directory')}
            {submenuLink(`${rowadWebsiteUrl}/experts-directory.html`, 'Experts Directory')}
            {submenuLink(`${rowadWebsiteUrl}/accelerators.html`, 'Accelerators')}
            {submenuLink(`${rowadWebsiteUrl}/events.html`, 'Events Calendar')}
          </div>

          <div className="rowad-menu-column">
            <h3>Join Rowad</h3>

            {submenuLink(`${rowadWebsiteUrl}/start-partnership.html`, 'Start Partnership')}
            {submenuLink(`${rowadWebsiteUrl}/become-a-mentor.html`, 'Become a Mentor')}
            {submenuLink(`${rowadWebsiteUrl}/become-an-ambassador.html`, 'Become an Ambassador')}
            {submenuLink(`${rowadWebsiteUrl}/special-requests.html`, 'Special Requests')}
            {submenuLink(`${rowadWebsiteUrl}/library.html`, 'Library')}
          </div>
        </div>
      ),
    },
    {
      type: 'menu',
      href: `${rowadWebsiteUrl}/starting.html`,
      content: 'For Who',
      submenuContent: (
        <div className="rowad-simple-menu">
          {submenuLink(`${rowadWebsiteUrl}/starting.html`, 'Starting a Business')}
          {submenuLink(`${rowadWebsiteUrl}/running.html`, 'Running a Business')}
          {submenuLink(`${rowadWebsiteUrl}/growing.html`, 'Growing a Business')}
        </div>
      ),
    },
    {
      type: 'item',
      href: `${rowadWebsiteUrl}/journey-guide.html`,
      content: 'Journey Guide',
    },
    {
      type: 'item',
      href: `${rowadWebsiteUrl}/about.html`,
      content: 'About',
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: 'Rowad Courses',
    },
  ];
  const defaultUserMenu = authenticatedUser === null ? [] : [{
    heading: '',
    items: [
      {
        type: 'item',
        href: `${config.LMS_BASE_URL}/dashboard`,
        content: intl.formatMessage(messages['header.user.menu.dashboard']),
      },
      {
        type: 'item',
        href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
        content: intl.formatMessage(messages['header.user.menu.profile']),
      },
      {
        type: 'item',
        href: config.ACCOUNT_SETTINGS_URL,
        content: intl.formatMessage(messages['header.user.menu.account.settings']),
      },
      // Users should only see Order History if have a ORDER_HISTORY_URL define in the environment.
      ...(config.ORDER_HISTORY_URL ? [{
        type: 'item',
        href: config.ORDER_HISTORY_URL,
        content: intl.formatMessage(messages['header.user.menu.order.history']),
      }] : []),
      {
        type: 'item',
        href: config.LOGOUT_URL,
        content: intl.formatMessage(messages['header.user.menu.logout']),
      },
    ],
  }];

  const mainMenu = mainMenuItems || defaultMainMenu;
  const secondaryMenu = secondaryMenuItems || [];
  const userMenu = authenticatedUser === null ? [] : userMenuItems || defaultUserMenu;

  const loggedOutItems = [
    {
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
    },
  ];

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: `${rowadWebsiteUrl}/index.html`,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    secondaryMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : secondaryMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
  };

  // Keep the public component API backwards compatible for applications that
  // deliberately provide a custom main or secondary navigation. The standard
  // shared header path uses the Rowad implementation below.
  if (mainMenuItems !== null || secondaryMenuItems !== null) {
    return (
      <>
        <Responsive maxWidth={769}>
          <MobileHeaderSlot props={props} />
        </Responsive>
        <Responsive minWidth={769}>
          <DesktopHeaderSlot props={props} />
        </Responsive>
      </>
    );
  }

  return (
    <RowadHeader
      authenticatedUser={authenticatedUser}
      config={config}
      locale={intl.locale}
      minimal={false}
      userMenu={userMenu}
    />
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
};

Header.propTypes = {
  mainMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  secondaryMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
      isActive: PropTypes.bool,
    })),
  })),
};

export default Header;
