import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';
import messages from './messages';
var LearningHeader = function LearningHeader(_ref) {
  var intl = _ref.intl,
    showUserDropdown = _ref.showUserDropdown;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser;
  var config = getConfig();
  return /*#__PURE__*/React.createElement("header", {
    className: "learning-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "container-xl py-2 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(LogoSlot, {
    href: "".concat(config.LMS_BASE_URL, "/dashboard"),
    src: config.LOGO_URL,
    alt: config.SITE_NAME
  }), /*#__PURE__*/React.createElement("nav", {
    className: "main-nav d-flex ml-4"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "".concat(config.LMS_BASE_URL, "/about")
  }, "ABOUT"), /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "".concat(config.LMS_BASE_URL, "/courses")
  }, "COURSES")), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1"
  }), showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username
  }), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)));
};
LearningHeader.propTypes = {
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map