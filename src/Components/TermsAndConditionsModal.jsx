/* eslint-disable react/no-unescaped-entities */

import PropTypes from "prop-types";
import { Modal, Button, ConfigProvider } from "antd";

const TermsAndConditionsModal = ({ termsModalOpen, setTermsModalOpen }) => {
  const handleClose = () => {
    setTermsModalOpen(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#fef6f5",
              headerBg: "#fef6f5",
              titleFontSize: "1.5rem",
            },
            Button: {
              colorPrimary: "#8e5ba6",
              colorPrimaryHover: "#8e5ba6",
              borderRadius: 8,
              borderColor: "#8e5ba6",
              borderColorHover: "#8e5ba6",
            },
          },
        }}
      >
        <Modal
          title={<span style={{ fontWeight: "bold" }}>Terms of Service</span>}
          open={termsModalOpen}
          onCancel={handleClose}
          width={1000}
          footer={[
            <Button key="close" onClick={handleClose}>
              Close
            </Button>,
          ]}
          centered
          
        >
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            1. Retention of Personal Information
          </h3>
          <p className="mb-3 md:mb-2 text-xs">
            We retain your personal information for as long as necessary to
            fulfill the purposes for which it was collected or as required by
            law. Health tracking data is stored securely and retained only as
            long as it is needed to provide our services. Once your personal
            information is no longer needed, we will securely dispose of it.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            2. Cookies and Tracking Technologies
          </h3>
          <p className="mb-3 md:mb-2 text-xs">
            We use cookies and similar tracking technologies to enhance your
            experience on our platform. Cookies allow us to recognize your
            device, track your usage, and personalize content. You can manage
            your cookie preferences through your browser settings.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">3. Children&#39;s Privacy</h3>
          <p className="mb-3 md:mb-2 text-xs">
            "Floravie" is not intended for use by individuals under the age
            of 18. We do not knowingly collect personal information from minors.
            If we become aware that we have collected personal information from
            a minor without parental consent, we will take steps to delete such
            information.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            4. International Data Transfers
          </h3>
          <p className="mb-3 md:mb-2 text-xs">
            Your personal information may be transferred to, stored, and
            processed in countries outside of Canada, including the United
            States, where our service providers are located. These countries may
            have different data protection laws than Canada. By using our
            services, you consent to such transfers.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">5. Contact Us</h3>
          <p className="mb-3 md:mb-2 text-xs">
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please contact us at:
            <a href="mailTo">Support@floravie.com</a>
          </p>

          <h3 className="font-bold mb-2 text-lg md:text-sm">Acknowledgment</h3>
          <p className="mb-3 md:mb-2 text-xs">
            By using our platform, you acknowledge that you have read,
            understood, and agreed to this Privacy Policy. Please review this
            privacy policy with legal counsel to ensure compliance with Canadian
            privacy laws and regulations, particularly regarding the handling of
            health data.
          </p>
        </Modal>
      </ConfigProvider>
    </>
  );
};

TermsAndConditionsModal.propTypes = {
  termsModalOpen: PropTypes.bool.isRequired,
  setTermsModalOpen: PropTypes.func.isRequired,
};

export default TermsAndConditionsModal;
