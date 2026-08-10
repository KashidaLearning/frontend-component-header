/* eslint-disable react/prop-types */
import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';
import { Context as ResponsiveContext } from 'react-responsive';

import Header from './index';

const HeaderComponent = ({ width, contextValue }) => (
  <ResponsiveContext.Provider value={width}>
    <IntlProvider locale="en" messages={{}}>
      <AppContext.Provider
        value={contextValue}
      >
        <Header />
      </AppContext.Provider>
    </IntlProvider>
  </ResponsiveContext.Provider>
);

describe('<Header />', () => {
  it('renders correctly for anonymous desktop', async () => {
    const contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
        ACCOUNT_PROFILE_URL: 'http://localhost:1995',
        ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
      },
    };
    const component = <HeaderComponent width={{ width: 1280 }} contextValue={contextValue} />;

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    let wrapper;
    await TestRenderer.act(async () => {
      wrapper = TestRenderer.create(component);
    });

    expect(wrapper.toJSON()).toMatchSnapshot();
    await TestRenderer.act(async () => {
      wrapper.unmount();
    });
  });

  it('renders correctly for authenticated desktop', async () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
        ACCOUNT_PROFILE_URL: 'http://localhost:1995',
        ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
      },
    };
    const component = <HeaderComponent width={{ width: 1280 }} contextValue={contextValue} />;

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    let wrapper;
    await TestRenderer.act(async () => {
      wrapper = TestRenderer.create(component);
    });

    expect(wrapper.toJSON()).toMatchSnapshot();
    await TestRenderer.act(async () => {
      wrapper.unmount();
    });
  });

  it('renders correctly for anonymous mobile', async () => {
    const contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
        ACCOUNT_PROFILE_URL: 'http://localhost:1995',
        ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
      },
    };
    const component = <HeaderComponent width={{ width: 500 }} contextValue={contextValue} />;

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    let wrapper;
    await TestRenderer.act(async () => {
      wrapper = TestRenderer.create(component);
    });

    expect(wrapper.toJSON()).toMatchSnapshot();
    await TestRenderer.act(async () => {
      wrapper.unmount();
    });
  });

  it('renders correctly for authenticated mobile', async () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
        ACCOUNT_PROFILE_URL: 'http://localhost:1995',
        ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
      },
    };
    const component = <HeaderComponent width={{ width: 500 }} contextValue={contextValue} />;

    let wrapper;
    await TestRenderer.act(async () => {
      wrapper = TestRenderer.create(component);
    });

    expect(wrapper.toJSON()).toMatchSnapshot();
    await TestRenderer.act(async () => {
      wrapper.unmount();
    });
  });
});
