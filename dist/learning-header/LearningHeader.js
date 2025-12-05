function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var LearningHeader = function LearningHeader(_ref) {
  var courseOrg = _ref.courseOrg,
    courseNumber = _ref.courseNumber,
    courseTitle = _ref.courseTitle,
    intl = _ref.intl,
    showUserDropdown = _ref.showUserDropdown;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser;
  var config = getConfig();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  var headerLogo = /*#__PURE__*/React.createElement(LogoSlot, {
    href: "".concat(config.LMS_BASE_URL, "/dashboard"),
    src: config.LOGO_URL,
    alt: config.SITE_NAME
  });
  var mainMenu = [{
    type: 'item',
    href: "".concat(config.LMS_BASE_URL),
    // Homepage
    content: 'الصفحة الرئيسية'
  }, {
    type: 'item',
    href: "".concat(config.LMS_BASE_URL, "/about"),
    // About page
    content: 'حول'
  }, {
    type: 'item',
    href: "".concat(config.LMS_BASE_URL, "/courses"),
    // Courses page
    content: 'البرامج'
  }, {
    type: 'item',
    href: "".concat(config.LMS_BASE_URL, "/contact"),
    // Contact page
    content: 'التواصل'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "learning-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "container-xl py-2 d-flex align-items-center header-container"
  }, headerLogo, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "burger-menu-icon d-block d-md-none",
    onClick: function onClick() {
      return setMenuOpen(!menuOpen);
    },
    "aria-expanded": menuOpen,
    "aria-label": "Toggle navigation menu"
  }, menuOpen ? /*#__PURE__*/React.createElement("span", {
    className: "close-icon"
  }, "X") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "burger-bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "burger-bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "burger-bar"
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "main-menu ml-3 d-none d-md-block"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav"
  }, mainMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      className: "nav-item",
      key: item.href || item.content
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link ".concat(item.className || ''),
      href: item.href
    }, item.content));
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "mobile-menu d-md-none ".concat(menuOpen ? 'open' : '')
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav"
  }, mainMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      className: "nav-item",
      key: item.href || item.content
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      href: item.href
    }, item.content));
  }))), showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username
  })), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)));
};
LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map