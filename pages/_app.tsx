import type { AppProps } from 'next/app';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { defaultLocale, dynamicActivate } from '../i18n';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || defaultLocale;

  useEffect(() => {
    // dynamically load catalogs of the current locale
    dynamicActivate(locale);
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
