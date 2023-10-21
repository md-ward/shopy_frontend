import create from 'zustand';

// Translation store
const useTranslationStore = create((set) => ({
  // Default language
  currentLanguage: 'en',

  // Translation data
  translations: {
    en: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
    },
    ar: {
      home: 'الرئيسية',
      shop: 'المتجر',
      about: 'حول',
      contact: 'اتصل',
    },
    fr: {
      home: 'Accueil',
      shop: 'Boutique',
      about: 'À propos',
      contact: 'Contact',
    },
  },

  // Method to update the current language
  setCurrentLanguage: (language) => {
    set({ currentLanguage: language });
  },

  // Method to get a translated string based on the current language
  t: (key) => {
    const { currentLanguage, translations } = useTranslationStore.getState();
    return translations[currentLanguage][key] || key;
  },
}));

export default useTranslationStore;