import { useRef } from "react";
import useTranslationStore from "../../global/state/useTranslationStore";
import { placeAcontactUsMessage } from "../controller/contactUsController";

const ContactUs = () => {
  const { t, currentLanguage } = useTranslationStore((state) => ({
    t: state.t,
    currentLanguage: state.currentLanguage,
  }));

  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    placeAcontactUsMessage(formData, formRef);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-indigo-600 md:flex-row">
      {/* store location */}
      <div
        className="flex aspect-square max-h-[28rem] bg-gray-200 caret-slate-300  max-sm:m-2 md:w-1/2"
        title="just an image placeholder, should be replaced with real store map"
      >
        <img
          className="h-full w-full object-cover"
          src="/assets/map.jpg"
          alt="this is a placeholder image for store location map"
        />
      </div>
      <div
        dir={currentLanguage === "ar" ? "rtl" : "lte"}
        className="w-[90%] bg-slate-50 p-4 shadow-md md:w-1/3"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">{t("contact")}</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="text-indigo-500  caret-indigo-500   [&_input]:outline-indigo-500  invalid:[&_input]:caret-red-500  invalid:[&_input]:outline-red-500  "
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              {t("name")}
            </label>
            <input
              pattern="[a-zA-Z\s]*"
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight"
              id="name"
              type="text"
              name="user_name"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              {t("email")}
            </label>
            <input
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight"
              id="email"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="message">
              {t("message")}
            </label>
            <textarea
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight"
              id="message"
              rows="5"
              name="message"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="custom-button focus:shadow-outline rounded px-4 py-2 font-bold text-white shadow-md hover:shadow-inner focus:outline-none"
              type="submit"
            >
              {t("send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
