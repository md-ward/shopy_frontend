import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWarning } from "@fortawesome/free-solid-svg-icons";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";
import { deleteContactUsMessage } from "../controller/statisticsController";

const ViewContactusMessages = ({ setToggleContactUs }) => {
  const { contactUsMessages, handleGettingContactUsMessages } =
    useDashboardFeaturesStore((state) => ({
      contactUsMessages: state.contactUsMessages,
      handleGettingContactUsMessages: state.handleGettingContactUsMessages,
    }));
  useEffect(() => {
    handleGettingContactUsMessages();
  }, [handleGettingContactUsMessages]);

  return (
    <div className="  absolute inset-0 h-full  w-full overflow-y-auto bg-white p-6">
      <span className="flex  items-center justify-between ">
        <h1 className="text-dark-blue mb-4 text-3xl font-bold">
          Contact Us Messages
        </h1>

        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => setToggleContactUs(false)}
          className="cursor-pointer  rounded-full bg-red-500 p-2 text-2xl text-white ring-slate-900 ring-offset-2 transition-all duration-300 ease-in-out hover:bg-indigo-900 hover:ring-1"
        />
      </span>
      <ul>
        {contactUsMessages?.length == 0 ? (
          <span className="flex h-96 w-full items-center  justify-center gap-4 uppercase ">
            <h1>No messages so far</h1>

            <FontAwesomeIcon
              icon={faWarning}
              className="text-dark-blue animate-bounce text-6xl"
            />
          </span>
        ) : (
          contactUsMessages?.map((message) => (
            <li
              key={message._id}
              className="mb-4 flex flex-col justify-start gap-4 rounded-lg bg-white p-4 shadow-md"
            >
              <p className="text-lg font-medium">{message.user_name}</p>
              <p className="text-gray-600">{message.email}</p>
              <p className="mt-2 text-gray-800">Message: {message.message}</p>
              <p>Message date: {message.created_at}</p>
              <span className="flex  w-full justify-end">
                <button
                  className="mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600  "
                  onClick={() => deleteContactUsMessage(message._id)}
                >
                  Remove message
                </button>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewContactusMessages;
