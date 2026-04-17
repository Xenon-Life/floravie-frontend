import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../Auth/PrivateRoutes";
import { toast, ToastContainer } from "react-toastify";
import { ButtonLoader } from "../../Components/Loaders";
import EmptyDataBox from "../../Components/EmptyDataBox";
import { Button } from "antd";
import ChatBotApi from "../HealthAssistant/ChatBotApi";
import ReportModal from "./ReportModal";

const logsMoods = [
  { id: 1, name: "Normal", emojiUrl: "/logmoods/Normal.svg" },
  { id: 2, name: "Happy", emojiUrl: "/logmoods/Happy.svg" },
  { id: 3, name: "Sensitive", emojiUrl: "/logmoods/Sensitive.svg" },
  { id: 4, name: "Sad", emojiUrl: "/logmoods/Sad.svg" },
  { id: 5, name: "Smug", emojiUrl: "/logmoods/Smug.svg" },
  { id: 6, name: "Morose", emojiUrl: "/logmoods/Morose.svg" },
  { id: 7, name: "Bored", emojiUrl: "/logmoods/Bored.svg" },
  { id: 8, name: "Grumpy", emojiUrl: "/logmoods/Grumpy.svg" },
  { id: 9, name: "Joyful", emojiUrl: "/logmoods/Joyful.svg" },
  { id: 10, name: "Fun", emojiUrl: "/logmoods/Fun.svg" },
  { id: 11, name: "Sleepy", emojiUrl: "/logmoods/Sleepy.svg" },
  { id: 12, name: "Angry", emojiUrl: "/logmoods/Angry.svg" },
  { id: 13, name: "Frisky", emojiUrl: "/logmoods/Frisky.svg" },
  { id: 14, name: "Tired", emojiUrl: "/logmoods/Tired.svg" },
  { id: 15, name: "Depressed", emojiUrl: "/logmoods/Depressed.svg" },
  { id: 16, name: "Tense", emojiUrl: "/logmoods/Tense.svg" },
  { id: 17, name: "Hopeful", emojiUrl: "/logmoods/Hopeful.svg" },
  { id: 18, name: "Surprised", emojiUrl: "/logmoods/Surprised.svg" },
  { id: 19, name: "Blissful", emojiUrl: "/logmoods/Blissful.svg" },
  { id: 20, name: "Excited", emojiUrl: "/logmoods/Excited.svg" },
  { id: 21, name: "In Love", emojiUrl: "/logmoods/In Love.svg" },
  { id: 22, name: "Distrustful", emojiUrl: "/logmoods/Distrustful.svg" },
  { id: 23, name: "Lonely", emojiUrl: "/logmoods/Lonely.svg" },
  { id: 24, name: "Tense", emojiUrl: "/logmoods/Tense.svg" },
  { id: 25, name: "Miserable", emojiUrl: "/logmoods/Miserable.svg" },
  { id: 26, name: "Industrious", emojiUrl: "/logmoods/Industrious.svg" },
  { id: 27, name: "Terrified", emojiUrl: "/logmoods/Terrified.svg" },
  { id: 28, name: "Enraged", emojiUrl: "/logmoods/Enraged.svg" },
  { id: 29, name: "Forgetful", emojiUrl: "/logmoods/Forgetful.svg" },
  { id: 30, name: "Flirtatious", emojiUrl: "/logmoods/Flirtatious.svg" },
  { id: 31, name: "Furious", emojiUrl: "/logmoods/Furious.svg" },
  { id: 32, name: "Anxious", emojiUrl: "/logmoods/Anxious.svg" },
  { id: 33, name: "Frustrated", emojiUrl: "/logmoods/Frustrated.svg" },
];

const MoodTracker = () => {
  const { user } = useUser();
  const userId = user._id;
  const [selectedYourMood, setSelectedYourMood] = useState([]);
  const [selectedLogMood, setSelectedLogMood] = useState([]);
  const [userMoodHistory, setUserMoodHistory] = useState([]);
  const [todaysMood, setTodaysMood] = useState([]);
  const [loader, setLoader] = useState(true);
  const [generateReport, setGenerateReport] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchLoggedMoods = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/mood-tracker/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      if (response.status === 200) {
        setUserMoodHistory(response.data.moodData.moodStatus);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const getTodaysMood = () => {
    const date = new Date().toISOString().split("T")[0];
    console.log("date", date);

    const todayMoodTypes = userMoodHistory
      .filter(
        (mood) => new Date(mood?.timestamp).toISOString().split("T")[0] === date
      )
      .map((mood) => mood?.moodType);

    setTodaysMood(todayMoodTypes);

    console.log("todays MOOD", todayMoodTypes);
  };
  useEffect(() => {
    fetchLoggedMoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userMoodHistory?.length > 0) {
      getTodaysMood();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMoodHistory]);

  const handleMoodClick = (id) => {
    if (selectedYourMood.includes(id)) {
      setSelectedYourMood(selectedYourMood.filter((moodId) => moodId !== id));
    } else {
      setSelectedYourMood([...selectedYourMood, id]);
    }
  };

  const handleLogMoodClick = (mood) => {
    const isSelected = selectedLogMood.some(
      (selectedMood) => selectedMood.id === mood.id
    );
    if (isSelected) {
      setSelectedLogMood(
        selectedLogMood.filter((selectedMood) => selectedMood.id !== mood.id)
      );
    } else {
      setSelectedLogMood([...selectedLogMood, mood]);
    }
  };

  const submitLoggedMoods = async () => {
    if (selectedLogMood?.length === 0) {
      return toast.error("Please select a mood to log!");
    }

    setSaveButtonLoading(true);

    try {
      const payload = {
        userId,
        selectedLogMood,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/mood-tracker/save`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error logging mood!");
      console.log(error);
    } finally {
      setSelectedLogMood([]);
      setSaveButtonLoading(false);
      fetchLoggedMoods();
    }
    console.log(selectedLogMood);
  };

  const getTodayReport = async () => {
    try {
      setGenerateReport(true);
      const moodString = Array.isArray(todaysMood)
        ? todaysMood.join(", ")
        : todaysMood;

      console.log("Mood for today:", moodString);
      const query = `create a summary of my mood today: ${moodString}`;
      const result = await ChatBotApi(query);
      setReportMessage(
        result?.ok && result.text
          ? result.text
          : result?.message || "Could not generate report."
      );
      setGenerateReport(false);
      setShowReportModal(true);
    } catch (error) {
      console.log(error);
      setGenerateReport(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {showReportModal && (
        <ReportModal
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
          reportMessage={reportMessage}
        />
      )}
      <div className="w-full flex flex-col gap-4 items-start p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
            <h1 className="font-semibold">Your Mood</h1>
          </div>

          {todaysMood?.length > 0 ? (
            <div>
              <button
                style={{ background: "#8E5BA6" }}
                className="text-white self-center px-4 py-1 md:px-2 rounded-full w-[200px] md:w-[75px] font-semibold text-base md:text-xs"
                onClick={() => getTodayReport()}
                disabled={generateReport}
              >
                {generateReport ? <ButtonLoader /> : <p> Generate Report</p>}
              </button>
            </div>
          ) : null}
        </div>

        <div
          style={{ background: "#FCEDEC" }}
          className="grid grid-cols-8 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-2 mb-4 md:mb-2 md:p-2 p-6 w-full rounded-md"
        >
          {loader ? (
            <div className="flex w-[80vh] justify-end">
              <ButtonLoader />
            </div>
          ) : userMoodHistory?.length > 0 ? (
            userMoodHistory?.map((mood) => (
              <div
                key={mood._id}
                className="flex flex-col justify-center items-center gap-3"
              >
                <button
                  onClick={() => handleMoodClick(mood._id)}
                  className={`w-16 h-16 flex items-center justify-center rounded-full bg-pink-200 text-3xl transition-all ${
                    selectedYourMood.includes(mood._id)
                      ? "border-2 border-red-500 relative"
                      : ""
                  }`}
                >
                  <img src={mood.moodImgUrl} alt="mood tracker" />
                  {selectedYourMood.includes(mood._id) && (
                    <span className="absolute top-1 right-[-7px] text-green-500 text-xl">
                      <img
                        src="/selectIcon.svg"
                        alt="check"
                        className="w-[20px]"
                      />
                    </span>
                  )}
                </button>
                <p>{mood.moodType}</p>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    <span className="font-bold">Date: </span>
                    {new Date(mood.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-bold">Time: </span>
                    {new Date(mood.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full overflow-hidden">
              <EmptyDataBox description="No Log History Found" />
            </div>
          )}
        </div>

        {/* new */}
        <div className="w-full flex flex-col">
          <div className="flex gap-4">
            <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
            <h1 className="font-semibold">Log your mood</h1>
          </div>
          <div className="grid grid-cols-8 md:grid-cols-2 lg:grid-cols-12 sm:grid-cols-2  md:gap-2 md:mt-3 gap-5 mt-8 w-full">
            {logsMoods?.map((mood) => (
              <div
                key={mood.id}
                className="flex flex-col justify-center items-center gap-3"
              >
                <button
                  onClick={() => handleLogMoodClick(mood)}
                  className={`w-16 h-16 flex items-center justify-center rounded-full bg-pink-200 text-3xl transition-all ${
                    selectedLogMood.some(
                      (selectedMood) => selectedMood.id === mood.id
                    )
                      ? "border-2 border-red-500 relative"
                      : ""
                  }`}
                >
                  <img src={mood.emojiUrl} alt="mood tracker" />
                  {selectedLogMood.some(
                    (selectedMood) => selectedMood.id === mood.id
                  ) && (
                    <span className="absolute top-1 right-[-7px] text-green-500 text-xl">
                      <img src="/selectIcon.svg" alt="check" width={20} />
                    </span>
                  )}
                </button>
                <p>{mood.name}</p>
              </div>
            ))}
          </div>
          <Button
            style={{ background: "#8E5BA6" }}
            className="text-white self-center py-6 px-[100px] rounded-full mt-6 hover:text-black font-semibold text-lg md:text-base md:py-1.5 md:px-14 md:mt-3"
            onClick={() => submitLoggedMoods()}
            loading={saveButtonLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default MoodTracker;
