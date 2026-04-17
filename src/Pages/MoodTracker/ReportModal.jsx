import PropTypes from "prop-types";
import { Modal, Button } from "antd";

const ReportModal = ({
  showReportModal,
  setShowReportModal,
  reportMessage,
}) => {
  const handleClose = () => {
    setShowReportModal(false);
  };

  return (
    <>
      <Modal
        title={<span style={{ fontWeight: "bold" }}>Mood Report</span>}
        open={showReportModal}
        onCancel={handleClose}
        maskClosable={false}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
        centered
      >
        <h3 className="font-regular mb-2 text-base md:text-sm">
          {reportMessage}
        </h3>
      </Modal>
    </>
  );
};

ReportModal.propTypes = {
  showReportModal: PropTypes.bool.isRequired,
  setShowReportModal: PropTypes.func.isRequired,
  reportMessage: PropTypes.string.isRequired,
};

export default ReportModal;
