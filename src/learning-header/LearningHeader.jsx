import React, { useContext } from 'react';
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

  const headerLogo = (
    <LogoSlot
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  const mainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}`, // Homepage
      content: intl.formatMessage(messages['header.links.home']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/about`, // About page
      content: intl.formatMessage(messages['header.links.about']),
    },
    {
      type: 'item', 
      href: `${config.LMS_BASE_URL}/courses`, // Courses page
      content: intl.formatMessage(messages['header.links.courses']),
    },
    {
      type: 'item', 
      href: `${config.LMS_BASE_URL}/contact`, // Contact page
      content: intl.formatMessage(messages['header.links.contact']),
    },
  ];


  return (
    <header className="learning-header">
      <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
      <div className="container-xl py-2 d-flex align-items-center">
        {headerLogo}
        
        {/* Burger menu for mobile */}
        <div className="burger-menu-icon d-block d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <span className="close-icon">X</span> // Show "X" when the menu is open
          ) : (
            <>
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
            </>
          )}
        </div>

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
          <LearningHelpSlot />
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
