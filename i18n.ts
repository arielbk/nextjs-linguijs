import { i18n } from '@lingui/core';
import { en, hr, de } from 'make-plural/plurals';

export const locales = {
  en: 'English',
  hr: 'Hrvatski',
  de: 'Deutsch',
};
export const defaultLocale = 'en';

i18n.loadLocaleData({
  en: { plurals: en },
  hr: { plurals: hr },
  de: { plurals: de },
});

/**
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  let data;
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    data = await import(`./locales/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!./locales/${locale}/messages.po`);
  }
  const { messages } = data;
  i18n.load(locale, messages);
  i18n.activate(locale);
}
