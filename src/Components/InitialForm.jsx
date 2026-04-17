import { Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { ButtonLoader } from "./Loaders";

function InitialForm({
  userId,
  initialFormModal,
  setInitialFormModal,
  fetchCycleHistory,
}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [cycleValue, setCycleValue] = useState(null);
  const [periodError, setPeriodError] = useState(false);
  const [cycleError, setCycleError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleStartDate = (date) => {
    if (date) {
      setStartDate(date.format("YYYY-MM-DD"));
      setStartDateError(false); // Clear error when a date is selected
    } else {
      setStartDate(null);
    }
  };

  const handleEndDate = (date) => {
    if (date) {
      setEndDate(date.format("YYYY-MM-DD"));
      setEndDateError(false); // Clear error when a date is selected
    } else {
      setEndDate(null);
    }
  };

  const handlePeriodLength = (value) => {
    setSelectedValue(value);
    setPeriodError(false); // Clear error when a value is selected
  };

  const handleCycleLength = (value) => {
    setCycleValue(value);
    setCycleError(false); // Clear error when a value is selected
  };

  const handleSave = async () => {
    // Validate each field and show relevant error message
    setPeriodError(!selectedValue);
    setCycleError(!cycleValue);
    setStartDateError(!startDate);
    setEndDateError(!endDate);

    if (!selectedValue || !cycleValue || !startDate || !endDate) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/save-onboarding`,
        {
          userId,
          periodLength: selectedValue,
          cycleLength: cycleValue,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Onboarding Completed successfully!");
        setInitialFormModal(false); // Close the modal
        fetchCycleHistory();
      } else {
        setInitialFormModal(false);
      }
    } catch (error) {
      setInitialFormModal(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!initialFormModal) {
      fetchCycleHistory(); // Fetch data when modal is closed
    }
  }, [initialFormModal]);
  return (
    <>
      <Modal
        className=""
        title={
          <span style={{ fontWeight: "bold", fontSize: "22px" }}>
            Welcome 😊 ( Answer a few questions to get started! )
          </span>
        }
        open={initialFormModal}
        onCancel={handleSave}
        closable={false}
        centered
        width={700}
        footer={[
          <button
            className="h-1 rounded-md px-4 py-2"
            key="close"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <p className="-mt-3">
                <ButtonLoader />
              </p>
            ) : (
              <p className="-mt-3">Save</p>
            )}
          </button>,
        ]}
      >
        <div className="mb-5 md:mb-3">
          <p className="mb-2 font-medium">Select your period length</p>
          <div>
            {[4, 5, 6, 7, 8].map((number) => (
              <button
                key={number}
                onClick={() => handlePeriodLength(number)}
                className="px-5 py-3 text-black"
                style={{
                  margin: "5px",
                  backgroundColor:
                    selectedValue === number ? "#FFC8C3" : "#FFE3E0",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                }}
              >
                <p className="text-[#525252] font-medium">{number}</p>
              </button>
            ))}
            {periodError && (
              <p className="text-sm text-red-500">Please select an option</p>
            )}
          </div>
        </div>

        <div className="mb-5 md:mb-3">
          <p className="mb-2 font-medium">Select your cycle length</p>
          <div>
            {[24, 25, 26, 27, 28, 29].map((number) => (
              <button
                key={number}
                onClick={() => handleCycleLength(number)}
                className="px-4 py-3 text-black"
                style={{
                  margin: "5px",
                  backgroundColor:
                    cycleValue === number ? "#FFC8C3" : "#FFE3E0",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                }}
              >
                <p className="text-[#525252] font-medium">{number}</p>
              </button>
            ))}
            {cycleError && (
              <p className="text-sm text-red-500">Please select an option</p>
            )}
          </div>
        </div>

        <p className="mb-2 font-medium">Latest Period Duration</p>
        <div className="mb-5 md:mb-3 flex gap-6">
          <div className="w-2/5 md:w-1/2">
            <p className="mb-2 font-medium">Start Date</p>
            <Space direction="vertical" className="w-full">
              <DatePicker
                onChange={handleStartDate}
                className="py-2.5 w-full"
              />
            </Space>
            {startDateError && (
              <p className="text-sm text-red-500">Please select start date</p>
            )}
          </div>
          <div className="w-2/5 md:w-1/2">
            <p className="mb-2 font-medium">End Date</p>
            <Space direction="vertical" className="w-full">
              <DatePicker onChange={handleEndDate} className="py-2.5 w-full" />
            </Space>
            {endDateError && (
              <p className="text-sm text-red-500">Please select end date</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default InitialForm;

InitialForm.propTypes = {
  userId: PropTypes.string.isRequired,
  initialFormModal: PropTypes.bool.isRequired,
  setInitialFormModal: PropTypes.func.isRequired,
};
