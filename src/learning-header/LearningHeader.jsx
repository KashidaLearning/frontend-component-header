import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';

import messages from './messages';

const LearningHeader = ({ intl, showUserDropdown }) => {
  const { authenticatedUser } = useContext(AppContext);
  const config = getConfig();

  return (
    <header className="learning-header">

      <a className="sr-only sr-only-focusable" href="#main-content">
        {intl.formatMessage(messages.skipNavLink)}
      </a>

      <div className="container-xl py-2 d-flex align-items-center">

        {/* Logo */}
        <LogoSlot
          href={`${config.LMS_BASE_URL}/dashboard`}
          src={config.LOGO_URL}
          alt={config.SITE_NAME}
        />

        {/* Main Navigation */}
        <nav className="main-nav d-flex ml-4">
          <a
            className="nav-link"
            href={`${config.LMS_BASE_URL}/about`}
          >
            ABOUT
          </a>

          <a
            className="nav-link"
            href={`${config.LMS_BASE_URL}/courses`}
          >
            COURSES
          </a>
        </nav>

        {/* Push user menu to right */}
        <div className="flex-grow-1" />

        {/* User menu */}
        {showUserDropdown && authenticatedUser && (
          <AuthenticatedUserDropdown
            username={authenticatedUser.username}
          />
        )}

        {showUserDropdown && !authenticatedUser && (
          <AnonymousUserMenu />
        )}

      </div>
    </header>
  );
};

LearningHeader.propTypes = {
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);