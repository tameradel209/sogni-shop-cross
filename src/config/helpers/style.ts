import i18n from 'i18next';

const isArabic = i18n.language == 'ar';

export const row = () => {
  return isArabic ? 'row-reverse' : 'row';
};

export const flexAlign = () => {
  return isArabic ? 'flex-start' : 'flex-end';
};
