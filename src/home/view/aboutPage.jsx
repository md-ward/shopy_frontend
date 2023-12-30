import useTranslationStore from "../../global/state/useTranslationStore";

const AboutPage = () => {
  const { t } = useTranslationStore((state) => ({
    t: state.t,
  }));
  return (
    <div className="mx-auto mb-6 flex max-w-7xl  flex-col  items-stretch sm:flex-row">
      <img
        src="/assets/about.svg"
        alt="about us svg "
        className="max-h-80 object-contain"
      />
      <span className="px-2">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          {t("about")}
        </h3>
        <p className="mx-auto  max-w-4xl  text-gray-600  ">{t("about_text")}</p>
      </span>
    </div>
  );
};

export default AboutPage;
