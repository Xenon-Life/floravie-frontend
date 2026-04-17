import { useEffect, useState } from "react";
import { Button, Calendar, Input, DatePicker, Select } from "antd";
// import ProgressBar from "../../Components/ProgressBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../Auth/PrivateRoutes";
import bloodDrop from "../../assets/bloodDrop.svg";
import progress from "../../assets/progress.svg";
import InitialForm from "../../Components/InitialForm";

const legends = [
  { color: "#FFE8E6", trackerType: "Period" },
  { color: "#A082B0", trackerType: "Fertile Window" },
  { color: "#FAD7B9", trackerType: "Mood" },
  { color: "#FFDBEF", trackerType: "Symptom" },
];
const getColorByTrackerType = (type) => {
  const legend = legends.find((legend) => legend.trackerType === type);
  return legend ? legend.color : "#ADD8E6";
};

const CycleTracker = () => {
  const { user } = useUser();
  const userId = user._id;
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [trackerType, setTrackerType] = useState(null);
  const [customData, setCustomData] = useState([]);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [averagePeriod, setAveragePeriod] = useState(0);
  const [averageCycle, setAverageCycle] = useState(0);
  const token = localStorage.getItem("token");
  const [initialFormModal, setInitialFormModal] = useState(false);
  const checkFirstTimeUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/is-first-time-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { isFirstTimeUser } = response.data;
        setInitialFormModal(isFirstTimeUser);
      } else {
        toast.error("Failed to fetch user status.");
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      toast.error("Error fetching user status.");
    }
  };
  const fetchCycleHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cycle-tracker/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { data, averagePeriodLength, averageCycleLength } = response.data;
        console.log("res", response);
        setCustomData(data);
        setAveragePeriod(averagePeriodLength);
        setAverageCycle(averageCycleLength);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFirstTimeUser();
    fetchCycleHistory();
    // calculatePeriodHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddData = () => {
    if (
      (selectedDate && trackerType.label === "Period") ||
      (selectedDate && trackerType.label === "Fertile Window")
    ) {
      const newEntry = {
        date: selectedDate.format("YYYY-MM-DD"),
        symptom: null,
        trackerType: trackerType.label,
      };
      // Log the new entry being added
      console.log("Adding new entry:", newEntry);

      setCustomData((prev) => {
        const updatedData = [...prev, newEntry];
        return updatedData;
      });
      setTrackerType(null);
      setInputValue("");
      setSelectedDate(null);
    } else if (
      (selectedDate && trackerType.label === "Symptom") ||
      trackerType.label === "Mood"
    ) {
      if (!inputValue) return toast.error("Please enter a symptom or mood");

      const newEntry = {
        date: selectedDate.format("YYYY-MM-DD"),
        symptom: inputValue,
        trackerType: trackerType.label,
      };
      // Log the new entry being added
      console.log("Adding new entry:", newEntry);

      setCustomData((prev) => {
        const updatedData = [...prev, newEntry];
        console.log("Updated customData:", updatedData);
        return updatedData;
      });
      setTrackerType(null);
      setInputValue("");
      setSelectedDate(null);
    }
  };

  const handleSaveData = async () => {
    setSaveButtonLoading(true);
    const payload = {
      userId,
      customData,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cycle-tracker/save`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else if (response.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    } finally {
      setSaveButtonLoading(false);
      fetchCycleHistory();
    }
  };

  const handleChange = (value, label) => {
    setTrackerType(label);
  };

  const dateCellRender = (value) => {
    const listData = customData?.filter(
      (entry) => entry.date === value.format("YYYY-MM-DD")
    );

    return (
      <div className="events">
        {listData.map((item, index) => (
          <div key={index} className="flex flex-wrap">
            <span
              style={{
                background: getColorByTrackerType(item.trackerType),
                overflow: "hidden",
              }}
              className="text-[8px] px-1 mr-2 py-1 h-min-5 rounded-full"
            >
              {item.trackerType}
            </span>
            {item.symptom ? (
              <span
                style={{ background: "#ADD8E6", overflow: "auto" }}
                className="text-[8px] px-2 py-1 h-min-5 rounded-full"
              >
                {item.symptom}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  // const calculatePeriodHistory = () => {
  //   const periodDates = customData.filter(
  //     (entry) => entry.trackerType === "Period"
  //   );
  //   periodDates.forEach((entry, index) => {
  //     const nextEntry = periodDates[index + 1];
  //     if (nextEntry) {
  //       const periodLength = new Date(nextEntry.date) - new Date(entry.date);
  //       console.log("Period Length:", periodLength);
  //     }
  //   }
  //   );
  //   console.log("Period Dates:", periodDates);
  // };

  return (
    <div className="w-full flex md:flex-col justify-start">
      <ToastContainer />
      <div>
        {initialFormModal && (
          <InitialForm
            userId={userId}
            fetchCycleHistory={fetchCycleHistory}
            initialFormModal={initialFormModal}
            setInitialFormModal={setInitialFormModal}
          />
        )}
      </div>
      <div className="w-full md:w-full flex flex-col md:mr-0">
        <div className="flex gap-4">
          <div
            style={{ background: "#FFCDCD" }}
            className="w-[220px] h-[100px] min-w[100px] min-h[100px] p-2 rounded-2xl relative"
          >
            <div className="flex justify-end px-3 py-3">
              <div className="bg-white rounded-full w-[32px] h-[32px] text-center flex justify-center items-center">
                <img className="h-2/3 w-1/2" src={bloodDrop} alt="..." />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <h1 className="font-semibold">{averagePeriod} Days</h1>
              <p>Average Period</p>
            </div>
          </div>

          <div
            style={{ background: "#E6F5CC" }}
            className="w-[220px] h-[100px] p-2 rounded-2xl relative"
          >
            <div className="flex justify-end px-3 py-3">
              <div className="bg-white rounded-full w-[32px] h-[32px] text-center flex justify-center items-center">
                <img className="h-2/3 w-1/2" src={progress} alt="..." />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <h1 className="font-semibold">{averageCycle} Days</h1>
              <p>Average Cycle</p>
            </div>
          </div>
        </div>

        <div className="mb-4 md:flex-wrap md:flex-col md:w-full w-full flex justify-start items-center mx-auto my-10">
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholder="Select Date"
            className="py-2 w-3/12 mr-2 md:w-11/12 md:mb-2"
          />
          <Select
            placeholder="Select Type"
            value={trackerType}
            className="w-3/12 mr-2 border-black custom-select md:w-11/12 md:mb-2"
            size="large"
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Symptom",
              },
              {
                value: "2",
                label: "Mood",
              },
              {
                value: "3",
                label: "Period",
              },
              {
                value: "4",
                label: "Fertile Window",
              },
            ]}
          />
          {((trackerType && trackerType?.label === "Symptom") ||
            trackerType?.label === "Mood") && (
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Mood/Symptom"
              className="w-3/12 py-2 mr-2 md:w-11/12 md:mb-2"
            />
          )}

          <Button
            onClick={handleAddData}
            size="large"
            disabled={!selectedDate || !setTrackerType}
            style={{ background: "#8E5BA6" }}
            className="text-white hover:text-white w-2/12 py-2.5 md:w-11/12 rounded-lg"
          >
            Add
          </Button>
        </div>

        <Calendar
          className="w-full custom-calendar"
          cellRender={dateCellRender}
        />

        <div className="flex items-center space-x-6 justify-center">
          {legends.map((legend, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: legend.color }}
              ></span>
              <span className="text-sm text-black">{legend.trackerType}</span>
            </div>
          ))}
        </div>
        <Button
          style={{ background: "#8E5BA6" }}
          className="mt-6 px-12 font-bold py-6 mb-8 rounded-full self-center"
          type="primary"
          onClick={handleSaveData}
          loading={saveButtonLoading}
        >
          Save
        </Button>
      </div>

      {/* <div className="md:w-full w-3/12">
        <ProgressBar />
      </div> */}
    </div>
  );
};

export default CycleTracker;

/*
const legends = [
  { color: "#FFE8E6", label: "Period" },
  { color: "#A082B0", label: "Fertile Window" },
  { color: "#FAD7B9", label: "Moods Logged" },
  { color: "#FFDBEF", label: "Symptoms Logged" },
];

   <div className="flex items-center space-x-6 justify-center">
          {legends.map((legend, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: legend.color }}
              ></span>
              <span className="text-sm text-black">{legend.label}</span>
            </div>
          ))}
        </div>
*/
