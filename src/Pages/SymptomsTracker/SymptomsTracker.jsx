/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Button, Rate } from "antd";
import EmptyDataBox from "../../Components/EmptyDataBox";
import { ButtonLoader } from "../../Components/Loaders";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../Auth/PrivateRoutes";
import axios from "axios";
import ChatBotApi from "../HealthAssistant/ChatBotApi";
import Markdown from "react-markdown";
import moment from "moment";
const symptomsData = [
  {
    id: 1,
    name: "Breast Pain",
    emojiUrl: "/symptoms/Breastpain.svg",
  },
  {
    id: 2,
    name: "Migraines",
    emojiUrl: "/symptoms/Migraines.svg",
  },
  {
    id: 3,
    name: "Cramps",
    emojiUrl: "/symptoms/Cramps.svg",
  },
  {
    id: 4,
    name: "Acne",
    emojiUrl: "/symptoms/Acne.svg",
  },
  {
    id: 5,
    name: "Dizziness",
    emojiUrl: "/symptoms/Dizziness.svg",
  },
  {
    id: 6,
    name: "Muscle Pain",
    emojiUrl: "/symptoms/Musclepain.svg",
  },
  {
    id: 7,
    name: "PMS",
    emojiUrl: "/symptoms/PMS.svg",
  },
  {
    id: 8,
    name: "Back Pain",
    emojiUrl: "/symptoms/Backpain.svg",
  },
  {
    id: 9,
    name: "Nausea",
    emojiUrl: "/symptoms/Nausea.svg",
  },
  {
    id: 10,
    name: "Bloating",
    emojiUrl: "/symptoms/bloating.svg",
  },
  {
    id: 11,
    name: "Sick",
    emojiUrl: "/symptoms/Sick.svg",
  },
];

const flowData = [
  {
    id: 1,
    name: "Light",
    emojiUrl: "/Flow/Light.svg",
  },
  {
    id: 2,
    name: "Medium",
    emojiUrl: "/Flow/Medium.svg",
  },
  {
    id: 3,
    name: "Heavy",
    emojiUrl: "/Flow/Heavy.svg",
  },
];

const dischargeData = [
  {
    id: 1,
    name: "Creamy",
    emojiUrl: "/DIscharge/Creamy.svg",
  },
  {
    id: 2,
    name: "Dry",
    emojiUrl: "/DIscharge/Dry.svg",
  },
  {
    id: 3,
    name: "Egg White",
    emojiUrl: "/DIscharge/Eggwhite.svg",
  },
  {
    id: 4,
    name: "Sticky",
    emojiUrl: "/DIscharge/Sticky.svg",
  },
  {
    id: 5,
    name: "Watery",
    emojiUrl: "/DIscharge/Watery.svg",
  },
];

// const reportData = [
//   { id: 1, color: "#F9B0AA", name: "Period", value: "x1" },
//   { id: 2, color: "#FFAE1F", name: "Follicular Phase", value: "x0" },
//   { id: 3, color: "#8E5BA6", name: "Fertile", value: "x2" },
//   { id: 4, color: "#9BE695", name: "Luteal Phase", value: "x1" },
// ];

const SymptomsTracker = () => {
  const { user } = useUser();
  const userId = user?._id;
  const [loggedSymptoms, setLoggedSymptoms] = useState([]);
  const [flow, setFlow] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [discharge, setDischarge] = useState([]);
  const [reportMessage, setReportMessage] = useState("");
  const [loader, setLoader] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const fetchLoggedSymptoms = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/symptoms-tracker/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLoggedSymptoms(response.data.symptoms);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchLoggedSymptoms();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFlow = (value, id) => {
    const flowInfo = flowData.find((flow) => flow.id === id);

    if (flowInfo) {
      const newFlowEntry = {
        id: flowInfo.id,
        name: flowInfo.name,
        // emojiUrl: flowInfo.emojiUrl,
        stars: value,
      };
      setFlow((prevFlow) => {
        const existingEntryIndex = prevFlow.findIndex((item) => item.id === id);
        if (existingEntryIndex !== -1) {
          const updatedFlow = [...prevFlow];
          updatedFlow[existingEntryIndex] = newFlowEntry;
          return updatedFlow;
        } else {
          return [...prevFlow, newFlowEntry];
        }
      });
    }
  };
  const addSymptoms = (value, id) => {
    const symptomsInfo = symptomsData.find((flow) => flow.id === id);

    if (symptomsInfo) {
      const newSymptomEntry = {
        id: symptomsInfo.id,
        name: symptomsInfo.name,
        emojiUrl: symptomsInfo.emojiUrl,
        stars: value,
      };
      setSymptoms((prevFlow) => {
        const existingEntryIndex = prevFlow.findIndex((item) => item.id === id);
        if (existingEntryIndex !== -1) {
          const updatedFlow = [...prevFlow];
          updatedFlow[existingEntryIndex] = newSymptomEntry;
          return updatedFlow;
        } else {
          return [...prevFlow, newSymptomEntry];
        }
      });
    }
  };

  const addDischarge = (value, id) => {
    const dischargeInfo = dischargeData.find((flow) => flow.id === id);

    if (dischargeInfo) {
      const newDischargeEntry = {
        id: dischargeInfo.id,
        name: dischargeInfo.name,
        stars: value,
      };
      setDischarge((prevFlow) => {
        const existingEntryIndex = prevFlow.findIndex((item) => item.id === id);
        if (existingEntryIndex !== -1) {
          const updatedFlow = [...prevFlow];
          updatedFlow[existingEntryIndex] = newDischargeEntry;
          return updatedFlow;
        } else {
          return [...prevFlow, newDischargeEntry];
        }
      });
    }
  };

  const submitLoggedSymptoms = async () => {
    const token = localStorage.getItem("token");

    if (symptoms?.length === 0) {
      return toast.error("Please select at least one item from body!");
    }
    if (flow?.length === 0) {
      return toast.error("Please select at least one item from flow!");
    }
    if (discharge?.length === 0) {
      return toast.error("Please select at least one item from discharge!");
    }
    setSaveButtonLoading(true);

    try {
      const payload = {
        userId,
        symptoms,
        flow,
        discharge,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/symptoms-tracker/save`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        generateReport(payload);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error logging mood!");
      console.log(error);
    } finally {
      setLoggedSymptoms([]);
      setSaveButtonLoading(false);
      fetchLoggedSymptoms();
    }
  };

  const generateReport = async (values) => {
    const { symptoms, flow, discharge } = values;
    const dischargeArray = discharge?.map((discharge) => discharge.name);
    const dischargeReport = dischargeArray.join(", ");

    const flowArray = flow?.map((flow) => flow.name);
    const flowReport = flowArray.join(", ");

    const symptomsArray = symptoms?.map((symptom) => symptom.name);
    const symptomsReport = symptomsArray.join(", ");
    const messageValue = `Generate short Analsyis for the following period symptoms: the body symptoms are ${symptomsReport}, the period is Flow: ${flowReport},the fluid Discharge is: ${dischargeReport}`;
    setReportLoading(true);
    try {
      const result = await ChatBotApi(messageValue);
      setReportMessage(
        result?.ok && result.text
          ? result.text
          : result?.message || "Could not generate report."
      );
    } catch (error) {
      toast.error("Error generating report!");
      console.log(error);
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-4 items-start p-4">
      <ToastContainer />
      <div className="w-full">
        <div className="flex gap-2 mb-2">
          <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
          <h1 className="font-semibold">Recently Logged Symptoms</h1>
        </div>

        <div
          style={{ background: "#FCEDEC" }}
          className="grid grid-cols-8 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-2 mb-4 md:mb-2 md:p-2 p-6 w-full rounded-md"
        >
          {loader ? (
            <div className="flex w-[80vh] justify-end">
              <ButtonLoader />
            </div>
          ) : loggedSymptoms?.length > 0 ? (
            loggedSymptoms?.map((mood) => (
              <div
                key={mood?._id}
                className="flex flex-col justify-center items-center gap-3"
              >
                <img src={mood?.emojiUrl} alt="mood tracker" />
                {loggedSymptoms.includes(mood?.id) && (
                  <span className="absolute top-1 right-[-7px] text-green-500 text-xl">
                    <img src="/selectIcon.svg" alt="check" width={20} />
                  </span>
                )}
                <p className="text-[14px] text-center h-5">{mood?.name}</p>
                <div className="text-center">
                  <div>
                    <span className="text-gray-500 text-[12px] font-semibold">
                      Date:{" "}
                    </span>
                    <span className="text-gray-500 text-[12px]">
                      {moment(mood?.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[12px] font-semibold">
                      Time:{" "}
                    </span>
                    <span className="text-gray-500 text-[12px]">
                      {moment(mood?.createdAt).format("h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full overflow-hidden">
              <EmptyDataBox description="No Log History Found" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full gap-3 md:flex-col">
        {/* Left Side */}
        <div className="flex flex-col gap-2 w-8/12 md:w-full">
          {/* Flow Container */}
          <div className="mb-5 md:mb-2">
            <div className="flex gap-4 md:gap-2">
              <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
              <h1 className="font-semibold">Flow</h1>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              {flowData?.map((flow) => (
                <div
                  key={flow.id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-3">
                    <img src={flow.emojiUrl} alt="mood tracker" width={50} />
                    <p>{flow.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Rate onChange={(value) => addFlow(value, flow.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body Container */}
          <div className="mb-5">
            <div className="flex gap-4">
              <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
              <h1 className="font-semibold">Body</h1>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              {symptomsData?.map((flow) => (
                <div
                  key={flow.id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-3">
                    <img src={flow.emojiUrl} alt="mood tracker" width={50} />
                    <p>{flow.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Rate onChange={(value) => addSymptoms(value, flow.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discharge Container */}
          <div className="">
            <div className="flex gap-4">
              <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
              <h1 className="font-semibold">Discharge</h1>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              {dischargeData?.map((flow) => (
                <div
                  key={flow.id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-3">
                    <img src={flow.emojiUrl} alt="mood tracker" width={50} />
                    <p>{flow.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Rate onChange={(value) => addDischarge(value, flow.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            style={{ background: "#8E5BA6" }}
            className="text-white self-center py-6 mb-8 px-[100px] rounded-full mt-6 font-semibold text-lg md:text-base md:py-1.5 md:px-14 md:mt-3"
            onClick={() => submitLoggedSymptoms()}
            loading={saveButtonLoading}
          >
            Save
          </Button>
        </div>

        {/* Report Part */}

        <div className="flex flex-col md:justify-center md:items-center gap-2 md:w-11/12 w-3/12">
          <div className="flex gap-4">
            <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />
            <h1 className="font-semibold">Report</h1>
          </div>
          <div
            style={{ background: "#FCEDEC" }}
            className="w-full flex justify-center items-center flex-col gap-3 p-4 md:p-2 rounded-xl shadow-sm"
          >
            <img src="/reportIcon.svg" alt="mood tracker" width={70} />
            <h1>Symptoms</h1>
            <p className="self-start">Analysis</p>
            {reportLoading ? (
              <div className="mt-4 w-full flex justify-center">
                <ButtonLoader />
              </div>
            ) : (
              <p className="self-start text-[13px]">
                {reportMessage ? (
                  <p>
                    <Markdown>{reportMessage}</Markdown>
                  </p>
                ) : (
                  "Add Symptoms to get a report."
                )}
              </p>
            )}
            {/* <div className="flex flex-col w-full gap-3">
              {reportData.map((report) => (
                <div
                  className="flex items-center justify-between"
                  key={report.id}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ background: report.color }}
                      className="w-[15px] h-[15px] rounded-full"
                    ></div>
                    <p>{report.name}</p>
                  </div>
                  <p>{loggedSymptoms?.length > 0 ? report.value : "0"}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsTracker;
