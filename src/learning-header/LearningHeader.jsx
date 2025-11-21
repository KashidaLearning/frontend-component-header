import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import messages from './messages';
import LearningHelpSlot from '../plugin-slots/LearningHelpSlot';

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const config = getConfig();             
  const [menuOpen, setMenuOpen] = useState(false);
  const headerLogo = (
    <LogoSlot
      href={`${config.LMS_BASE_URL}/dashboard`}
      src={config.LOGO_URL}
      alt={config.SITE_NAME}
    />
  );

  const mainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}`, // Homepage
      content: 'الصفحة الرئيسية',
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/about`, // About page
      content: 'حول',
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/courses`, // Courses page
      content: 'البرامج',
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/contact`, // Contact page
      content: 'التواصل',
    },
  ];

  return (
    <header className="learning-header">
      <a className="sr-only sr-only-focusable" href="#main-content">
        {intl.formatMessage(messages.skipNavLink)}
      </a>
      <div className="container-xl py-2 d-flex align-items-center header-container">
        {headerLogo}

        {/* Burger menu for mobile */}
        <button
          type="button"
          className="burger-menu-icon d-block d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <span className="close-icon">X</span>
          ) : (
            <>
              <span className="burger-bar" />
              <span className="burger-bar" />
              <span className="burger-bar" />
            </>
          )}
        </button>

        <nav className="main-menu ml-3 d-none d-md-block">
          <ul className="nav">
            {mainMenu.map((item) => (
              <li className="nav-item" key={item.href || item.content}>
                <a className={`nav-link ${item.className || ''}`} href={item.href}>
                  {item.content}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        <nav className={`mobile-menu d-md-none ${menuOpen ? 'open' : ''}`}>
          <ul className="nav">
            {mainMenu.map((item) => (
              <li className="nav-item" key={item.href || item.content}>
                <a className="nav-link" href={item.href}>
                  {item.content}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {showUserDropdown && authenticatedUser && (
          <>
          
            <AuthenticatedUserDropdown
              username={authenticatedUser.username}
            />
          </>
        )}
        {showUserDropdown && !authenticatedUser && (
          <AnonymousUserMenu />
        )}
      </div>
    </header>
  );
};

LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);

