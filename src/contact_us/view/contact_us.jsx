
import useTranslationStore from '../../global/state/useTranslationStore';

const ContactUs = () => {
  const { t, currentLanguage } = useTranslationStore();

  return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600">
        <div className="flex w-full gap-2  justify-center">
          {/* store location */}
          <div className="w-1/2 bg-gray-200 " title='just an image placeholder ,should be replaced with real store map '>
            <img className='object-cover w-full h-full' src="/assets/map.jpg" alt="this is a place holder img for store location map " />
          </div>
          <div
            dir={currentLanguage === 'ar' ? 'rtl' : 'lte'}
            className="p-4 w-1/3 shadow-md bg-slate-50"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">{t('contact')}</h1>
            <form className="text-indigo-500">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  {t('name')}
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  {t('email')}
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="message">
                  {t('message')}
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="5"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="custome_grad shadow-md hover:shadow-inner text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {t('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ContactUs;