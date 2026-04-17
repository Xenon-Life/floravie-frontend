import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const navigateToSymptomsTracker = () => {
    navigate("/symptoms-tracker");
  };

  const navigateToMoodTracker = () => {
    navigate("/mood-tracker");
  };

  const navigateToCycleTracker = () => {
    navigate("/cycle-tracker");
  };

  const navigateToQuizzes = () => {
    navigate("/quizzes");
  };

  const navigateToCommunity = () => {
    navigate("/community");
  };
  return (
    <>
      <div className="w-full flex justify-start gap-20 md:flex-col">
        <div className="flex w-[60%] md:w-full items-center justify-between flex-wrap">
          <div className="symptoms-tracker-card md:w-full min-w-[48%] max-h-[255px] min-h-[255px] mb-4 md:mb-2">
            <p className="text-2xl md:text-xl font-medium pt-2 px-5 mb-4">
              Symptom Tracker
            </p>
            <div className="px-5">
              <button
                className="rounded-3xl px-5 py-2 font-semibold text-black mb-4 bg-[#F0C3DC] hover:text-[#8e5ba6]"
                onClick={() => navigateToSymptomsTracker()}
              >
                Check Now
              </button>
            </div>
          </div>

          <div className="mood-tracker-card md:w-full min-w-[48%] max-h-[255px] min-h-[255px] mb-4 md:mb-2">
            <p className="text-2xl md:text-xl font-medium pt-2 px-5 mb-4">
              Mood Tracker
            </p>
            <div className="px-5">
              <button
                className="rounded-3xl px-5 py-2 font-semibold text-black mb-4 bg-[#BCE3E6] hover:text-[#8e5ba6]"
                onClick={() => navigateToMoodTracker()}
              >
                Log Now
              </button>
            </div>
          </div>

          <div className="cycle-tracker-card md:w-full min-w-[48%] max-h-[255px] min-h-[255px] mb-4 md:mb-2">
            <p className="text-2xl md:text-xl font-medium pt-2 px-5 mb-4">
              Cycle Tracker
            </p>
            <div className="px-5">
              <button
                className="rounded-3xl px-5 py-2 font-semibold text-black mb-4 bg-[#E2E0A8] hover:text-[#8e5ba6]"
                onClick={() => navigateToCycleTracker()}
              >
                Edit Now
              </button>
            </div>
          </div>

          <div className="health-assistant-card md:w-full min-w-[48%] max-h-[255px] min-h-[255px] mb-4 md:mb-2">
            <p className="text-2xl md:text-xl font-medium pt-2 px-5 mb-4">
              Quizzes
            </p>
            <div className="px-5">
              <button
                className="rounded-3xl px-5 py-2 font-semibold text-black mb-4 bg-[#D4B6E1] hover:text-[#8e5ba6]"
                onClick={() => navigateToQuizzes()}
              >
                Start Now
              </button>
            </div>
          </div>

          <div className="health-assistant-card md:w-full min-w-[48%] max-h-[255px] min-h-[255px] mb-4 md:mb-2">
            <p className="text-2xl md:text-xl font-medium pt-2 px-5 mb-4">
              Community
            </p>
            <div className="px-5">
              <button
                className="rounded-3xl px-5 py-2 font-semibold text-black mb-4 bg-[#D4B6E1] hover:text-[#8e5ba6]"
                onClick={() => navigateToCommunity()}
              >
                Open Now
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex md:w-full md:justify-center md:items-center"></div>
      </div>
    </>
  );
}

export default Dashboard;
