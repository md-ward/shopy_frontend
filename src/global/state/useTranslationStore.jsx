import { create } from 'zustand';
import { getCookie, setCookie } from '../cookies/settings_cookies';

/**
 *@param {object} - useTranslationStore - responsible for controlling translation over the app.
 *@callback t - function for setting the new language .
 *@param {string}   currentLanguage - the current language. 


*/


const useTranslationStore = create((set) => ({
  // Default language
  currentLanguage: getCookie('lang') || 'en',

  // Translation data
  translations: {
    en: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact Us',
      featured: 'Featured Products',
      followUs: 'Follow Us',
      allRightsReserved: 'All rights reserved.',
      quick_links: 'Quick Links',
      cr: 'Eng.Mohammad Ward, All rights reserved.'
      , about_text: "Welcome to our online shop! We are passionate about providing high-quality products to our customers. With a wide range of options, we aim to cater to every individual's unique needs and preferences. Our team is dedicated to ensuring a seamless shopping experience, from browsing our website to receiving your order at your doorstep. Shop with us and discover the joy of convenient and reliable online shopping."
      ,
      productDetails: 'Product Details',
      comments: 'Comments:'
      , addToCart: 'Add to Cart',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',

    },
    ar: {
      home: 'الرئيسية',
      shop: 'المتجر',
      about: 'من نحن',
      contact: 'اتصل بنا',
      featured: 'المنتجات المميزة',
      followUs: 'تابعنا',
      allRightsReserved: 'جميع الحقوق محفوظة.',
      quick_links: 'روابط سريعة',
      cr: 'برمجة المهندس محمد ورد , جميع الحقوق محفوظة',
      about_text: "مرحبًا بك في متجرنا عبر الإنترنت! نحن متحمسون لتوفير منتجات عالية الجودة لعملائنا. نهدف من خلال توفير مجموعة واسعة من الخيارات لتلبية احتياجات وتفضيلات كل فرد بشكل فريد. فريقنا مكرس لضمان تجربة تسوق سلسة، بدءًا من تصفح موقعنا الإلكتروني إلى استلام طلبك على باب منزلك. تسوق معنا واكتشف متعة التسوق عبر الإنترنت السهل والموثوق به."
      , productDetails: 'تفاصيل المنتج',
      comments: 'التعليقات :'
      , addToCart: 'إضافة الى السلة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال',


    },
    fr: {
      home: 'Accueil',
      shop: 'Boutique',
      about: 'À propos',
      contact: 'Contact',
      featured: 'Produits vedettes',
      followUs: 'Suivez-nous',
      allRightsReserved: 'Tous droits réservés.',
      quick_links: 'Liens rapides',
      cr: 'Eng.Mohammad Ward, Tous droits réservés.',
      about_text: "Bienvenue dans notre boutique en ligne ! Nous sommes passionnés par la fourniture de produits de haute qualité à nos clients. Avec un large choix d'options, nous visons à répondre aux besoins et aux préférences uniques de chaque individu. Notre équipe est dévouée à garantir une expérience de magasinage fluide, de la navigation sur notre site Web à la réception de votre commande à votre porte. Faites vos achats avec nous et découvrez la joie du shopping en ligne pratique et fiable."
      , productDetails: 'Détails du produit',
      comments: 'Commentaires :',
      addToCart: 'Ajouter au panier',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',

    },
  },

  // Method to update the current language
  setCurrentLanguage: (language) => {
    set({ currentLanguage: language });
    setCookie('lang', language);
  },

  // Method to get a translated string based on the current language
  t: (key) => {
    const { currentLanguage, translations } = useTranslationStore.getState();
    return translations[currentLanguage][key] || key;
  },
}));

export default useTranslationStore;