import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import './rowad-footer.scss';

const ROWAD_SITE = 'https://rowadjourney.com';
const LANGUAGE_EVENT = 'rowad-language-change';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normaliseLanguage = value => (
  String(value || '').toLowerCase().split('-')[0] === 'ar' ? 'ar' : 'en'
);

const FOOTER_TEXT = {
  en: {
    join: 'Stay Connected',
    subscribe: 'Never Miss a',
    newsletter: 'Conversation.',
    subscribeButton: 'Subscribe Now',
    emailLabel: 'Email address',
    emailPlaceholder: 'Email address',
    rowadLogoAlt: 'Rowad Logo',
    sedcoLogoAlt: 'Sedco Holdings Logo',
    socialLabel: 'Social media',
    instagramLabel: "Rowad's Instagram Page",
    linkedinLabel: "Rowad's LinkedIn Page",
    xLabel: "Rowad's X Profile",
    youtubeLabel: "Rowad's YouTube Channel",
  },
  ar: {
    join: 'ابقَ على تواصل',
    subscribe: 'لا تفوّت',
    newsletter: 'جديد روّاد.',
    subscribeButton: 'اشترك الآن',
    emailLabel: 'عنوان البريد الإلكتروني',
    emailPlaceholder: 'البريد الإلكتروني',
    rowadLogoAlt: 'شعار رواد',
    sedcoLogoAlt: 'شعار سدكو القابضة',
    socialLabel: 'وسائل التواصل الاجتماعي',
    instagramLabel: 'صفحة رواد على إنستغرام (يفتح في علامة تبويب جديدة)',
    linkedinLabel: 'صفحة رواد على لينكدإن (يفتح في علامة تبويب جديدة)',
    xLabel: 'ملف رواد الشخصي على X (يفتح في علامة تبويب جديدة)',
    youtubeLabel: 'قناة رواد على يوتيوب (يفتح في علامة تبويب جديدة)',
  },
};

const FOOTER_COLUMNS = {
  en: [
    ['Quick links', [['Home', '/en'], ['About', '/en/about'], ['Journey Guide', '/en/journey-guide'], ['Courses', '/en/courses'], ['Content', '/en/content']]],
    ['Connect', [['Partnerships', '/en/partnerships'], ['Initiatives', '/en/initiatives']]],
    ['Find', [['Glossary', '/en/glossary'], ['Tools Directory', '/en/tools-directory'], ['Funding Directory', '/en/funding-directory'], ['Experts Directory', '/en/experts-directory'], ['Events calendar', '/en/events']]],
    ['Collaborate', [['Start partnership', '/en/contact?type=partnership'], ['Become a mentor', '/en/contact?type=mentor'], ['Become an Ambassador', '/en/contact?type=ambassador'], ['Special requests', '/en/contact?type=special_request']]],
    ['For Who', [['Starting a Business', '/en/starting'], ['Running a Business', '/en/running'], ['Growing a Business', '/en/growing']]],
    ['Other', [['Terms of Use', '/en/terms'], ['Privacy Policy', '/en/privacy']]],
  ],
  ar: [
    ['روابط سريعة', [['الرئيسية', '/'], ['عن روّاد', '/حول'], ['دليل الرحلة', '/دليل-الرحلة'], ['الدورات', '/دورات'], ['المحتوى', '/محتوى']]],
    ['تواصل', [['الشراكات', '/شراكات'], ['المبادرات', '/مبادرات']]],
    ['اكتشف', [['المصطلحات', '/مصطلحات'], ['دليل الأدوات', '/دليل-الأدوات'], ['دليل التمويل', '/دليل-التمويل'], ['دليل الخبراء', '/دليل-الخبراء'], ['تقويم الفعاليات', '/فعاليات']]],
    ['تعاون', [['ابدأ شراكة', '/اتصل?type=partnership'], ['كن مرشدًا', '/اتصل?type=mentor'], ['كن سفيرًا', '/اتصل?type=ambassador'], ['طلبات خاصة', '/اتصل?type=special_request']]],
    ['لمن روّاد', [['بدء عمل تجاري', '/بدء'], ['إدارة عمل تجاري', '/إدارة'], ['تنمية عمل تجاري', '/تنمية']]],
    ['أخرى', [['شروط الاستخدام', '/شروط'], ['سياسة الخصوصية', '/خصوصية']]],
  ],
};


const LOGOS = {
  en: `${ROWAD_SITE}/logo-en-light.svg`,
  ar: `${ROWAD_SITE}/logo-ar-light.svg`,
};

const RowadFooter = ({ className, locale: localeProp }) => {
  const intl = useIntl();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locale = localeProp || intl.locale || document.documentElement.lang || 'en';
  const [language, setLanguage] = useState(() => normaliseLanguage(
    window.localStorage.getItem('rowad-language') || locale,
  ));
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const text = FOOTER_TEXT[language];
  const columns = FOOTER_COLUMNS[language];
  const logo = LOGOS[language];
  const subscribingLabel = language === 'en'
    ? 'Subscribing...'
    : 'جارٍ الاشتراك...';

  useEffect(() => {
    const syncLanguage = event => setLanguage(normaliseLanguage(event.detail));
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!EMAIL_RE.test(normalizedEmail)) {
      setStatus('invalid');
      return;
    }

    const lmsBaseUrl = String(getConfig().LMS_BASE_URL || '')
      .replace(/\/$/, '');

    if (!lmsBaseUrl) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus('submitting');

    try {
      await getAuthenticatedHttpClient().post(
        `${lmsBaseUrl}/api/v1/newsletter/subscription/`,
        { email: normalizedEmail },
      );

      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="rowadThemeFooter"
      className={`site-footer ${className || ''}`}
      lang={language}
      dir={direction}
    >
      <div className="footer-inner">
        {/* Newsletter Section */}
        <section className="newsletter-card" aria-labelledby="newsletterTitle">
          <div className="newsletter-content">
            <p className="eyebrow">{text.join}</p>
            <h2 className="newsletter-title" id="newsletterTitle">{text.subscribe}</h2>
            <p className="newsletter-subtitle">{text.newsletter}</p>
          </div>
          <form className="newsletter-form" id="newsletterForm" onSubmit={handleNewsletterSubmit}>
            <label className="sr-only" htmlFor="newsletterEmail">{text.emailLabel}</label>
            <input
              id="newsletterEmail"
              type="email"
              placeholder={text.emailPlaceholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setStatus('');
              }}
              autoComplete="email"
              aria-describedby="newsletterStatus"
              aria-invalid={status === 'invalid'}
              required
              disabled={isSubmitting || status === 'success'}
            />
            <button
              id="subscribeButton"
              type="submit"
              disabled={
                  isSubmitting
                  || status === 'success'
                  || !EMAIL_RE.test(email.trim())
                }
            >
              {isSubmitting ? subscribingLabel : text.subscribeButton}
            </button>
            <p
              className={
                status === 'invalid' || status === 'error'
                  ? 'newsletter-status is-error'
                  : 'newsletter-status'
              }
              id="newsletterStatus"
              role="status"
              aria-live="polite"
            >
              {status === 'submitting'
                && (language === 'en' ? 'Subscribing...' : 'جارٍ الاشتراك...')}
              {status === 'success'
                && (language === 'en' ? 'Thank you for subscribing!' : 'شكراً للاشتراك!')}
              {status === 'invalid'
                && (language === 'en' ? 'Please enter a valid email.' : 'يرجى إدخال بريد إلكتروني صحيح.')}
              {status === 'error'
                && (language === 'en' ? 'Subscription failed. Please try again.' : 'تعذر الاشتراك. يرجى المحاولة مرة أخرى.')}
            </p>
          </form>
        </section>

        {/* Brand & Social Section */}
        <div className="footer-brand-social">
          <div className="footer-brands">
            <img className="footer-rowad-logo" src={logo} alt={text.rowadLogoAlt} />
            <img
              className="footer-sedco-logo"
              src={`${ROWAD_SITE}/_astro/sedco.CV7nyhA2_Z2clPh6.webp`}
              alt={text.sedcoLogoAlt}
            />
          </div>
          <div className="social-links" aria-label={text.socialLabel}>
            <a href="https://www.instagram.com/rowad_sedco?igsh=MW1vdWxuNGsxY3VpMw==" target="_blank" rel="noopener noreferrer" aria-label={text.instagramLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/rowad-%D8%B1%D9%88%D8%A7%D8%AF/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label={text.linkedinLabel}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.3 7.9H1.7V22h3.6V7.9ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22 14.1c0-4.3-2.3-6.5-5.4-6.5a4.7 4.7 0 0 0-4.3 2.4V7.9H8.7V22h3.6v-7c0-1.9.4-3.7 2.7-3.7s2.4 2.1 2.4 3.8V22H22v-7.9Z" /></svg>
            </a>
            <a href="https://x.com/rowad_sedco?s=11&t=Jq7gJ6JUK0A0ca7nbuZROg" target="_blank" rel="noopener noreferrer" aria-label={text.xLabel}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.2L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" /></svg>
            </a>
            <a href="https://www.youtube.com/@rowadSEDCO" target="_blank" rel="noopener noreferrer" aria-label={text.youtubeLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12s0-4-1-6c-.5-1-1.4-1.4-2.4-1.6C16.8 4 12 4 12 4s-4.8 0-6.6.4C4.4 4.6 3.5 5 3 6c-1 2-1 6-1 6s0 4 1 6c.5 1 1.4 1.4 2.4 1.6C7.2 20 12 20 12 20s4.8 0 6.6-.4c1-.2 1.9-.6 2.4-1.6 1-2 1-6 1-6Z" /><path d="m10 9 5 3-5 3V9Z" /></svg>
            </a>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="footer-divider" />

        {/* Footer Links */}
        <div className="footer-links">
          {columns.map(([columnTitle, links]) => (
            <section key={columnTitle} className="footer-column">
              <h3>{columnTitle}</h3>
              <ul>
                {links.map(([linkText, linkPath]) => (
                  <li key={`${linkText}-${linkPath}`}>
                    <a href={linkPath === '#' ? '#' : `${ROWAD_SITE}${linkPath}`}>
                      {linkText}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </footer>
  );
};

RowadFooter.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
};

RowadFooter.defaultProps = {
  className: '',
  locale: undefined,
};

export default RowadFooter;
