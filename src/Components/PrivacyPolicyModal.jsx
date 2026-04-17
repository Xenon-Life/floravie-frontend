/* eslint-disable react/no-unescaped-entities */

import PropTypes from "prop-types";
import { Modal, Button, ConfigProvider } from "antd";

const PrivacyPolicyModal = ({ privacyModalOpen, setPrivacyModalOpen }) => {
  const handleClose = () => {
    setPrivacyModalOpen(false);
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
          title={<span style={{ fontWeight: "bold" }}>Privacy Policy</span>}
          open={privacyModalOpen}
          onCancel={handleClose}
          width={1000}
          footer={[
            <Button key="close" onClick={handleClose}>
              Close
            </Button>,
          ]}
          
        >
          <h3 className="font-bold mb-2 text-lg mt-10 md:mt-3">
            Introduction:
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            Floravie ("we," "us," or "our") is committed to protecting the
            privacy and confidentiality of our users' personal information. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your personal information when you use our website, mobile
            application, and services. We adhere to the Personal Information
            Protection and Electronic Documents Act (PIPEDA) and other
            applicable Canadian privacy laws.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            1. Collection of Personal Information
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            We collect personal information that you provide to us voluntarily
            when you register for an account, use our services, or interact with
            our platform. The types of personal information we may collect
            include:
          </p>
          <ul className="mb-3 md:text-xs">
            <li className="mb-2">
              <strong>Contact Information:</strong> Name, email address, phone
              number, and mailing address.
            </li>
            <li className="mb-2">
              <strong>Health Information:</strong> Health metrics, data related
              to your well-being, and other health-related information that you
              choose to share.
            </li>
            <li className="mb-2">
              <strong>Payment Information:</strong> Credit card details and
              billing information when you make purchases on our platform.
            </li>
            <li className="mb-2">
              <strong>Technical Information:</strong> IP address, device type,
              operating system, browser type, and usage data collected through
              cookies and similar technologies.
            </li>
            <li className="mb-2">
              <strong>Location Data:</strong> Geolocation information if you
              grant us access to your location.
            </li>
          </ul>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            2. Health Tracking
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            As part of our services, we offer health tracking features that
            allow you to monitor various health metrics, such as menstrual
            cycles, fitness activities, and other indicators. The information
            collected through health tracking is used to:
          </p>
          <ul className="mb-3 md:text-xs">
            <li className="mb-2">
              <strong>Provide Insights:</strong> We use your tracked data to
              offer personalized insights and recommendations based on your
              health metrics.
            </li>
            <li className="mb-2">
              <strong>Monitor Progress:</strong> We help you track your progress
              over time by storing and analyzing your health data.
            </li>
            <li className="mb-2">
              <strong>Improve Services:</strong> The aggregated data from health
              tracking may be used to improve our services, ensuring they are
              tailored to users' needs and preferences.
            </li>
          </ul>
          <p className="mb-3 md:mb-2 md:text-xs">
            <strong>Consent for Health Data:</strong> By using our health
            tracking features, you consent to the collection, use, and storage
            of your health data as described in this policy. You have the right
            to withdraw your consent at any time, but please note that doing so
            may affect your ability to use certain features of our platform.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            3. Use of Personal Information
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            We use your personal information for the following purposes:
          </p>
          <ul>
            <li className="mb-2">
              <strong>Service Delivery:</strong> To provide and maintain our
              services, including creating and managing your account.
            </li>
            <li className="mb-2">
              <strong>Communication:</strong> To send you updates, newsletters,
              and promotional materials that may interest you.
            </li>
            <li className="mb-2">
              <strong>Payment Processing:</strong> To process payments for
              services and purchases made on our platform.
            </li>
            <li className="mb-2">
              <strong>Customer Support:</strong> To respond to your inquiries,
              resolve issues, and provide customer support.
            </li>
            <li className="mb-2">
              <strong>Platform Improvement:</strong> To analyze usage patterns
              and improve our platform's functionality and user experience.
            </li>
            <li className="mb-2">
              <strong>Legal Compliance:</strong> To comply with legal
              obligations and protect our rights and interests.
            </li>
          </ul>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            4. Disclosure of Personal Information
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            We do not sell or rent your personal information to third parties.
            We may share your personal information with:
          </p>
          <ul>
            <li className="mb-2">
              <strong>Service Providers:</strong> Third-party companies that
              provide services on our behalf, such as payment processing, data
              analysis, and customer support. These service providers are
              contractually obligated to protect your personal information.
            </li>
            <li className="mb-2">
              <strong>Legal Requirements:</strong> We may disclose your personal
              information if required by law, such as to comply with a subpoena,
              court order, or other legal processes.
            </li>
            <li className="mb-2">
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of all or part of our assets, your personal
              information may be transferred to the acquiring entity.
            </li>
          </ul>
          <h3 className="font-bold mb-2 text-lg md:text-sm">
            5. Data Security
          </h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access, use,
            disclosure, or loss. These measures include encryption, access
            controls, and secure storage. However, please note that no method of
            transmission over the internet or electronic storage is completely
            secure.
          </p>
          <h3 className="font-bold mb-2 text-lg md:text-sm">6. Your Rights</h3>
          <p className="mb-3 md:mb-2 md:text-xs">
            Under Canadian law, you have the following rights regarding your
            personal information:
          </p>
          <ul>
            <li className="mb-2">
              <strong>Access:</strong> You have the right to request access to
              the personal information we hold about you.
            </li>
            <li className="mb-2">
              <strong>Correction:</strong> You have the right to request
              correction of inaccurate or incomplete personal information.
            </li>
            <li className="mb-2">
              <strong>Withdrawal of Consent:</strong> You may withdraw your
              consent to the collection, use, or disclosure of your personal
              information at any time, subject to legal or contractual
              restrictions and reasonable notice.
            </li>
            <li className="mb-2">
              <strong>Complaints:</strong> If you have concerns about how we
              handle your personal information, you have the right to file a
              complaint with the Office of the Privacy Commissioner of Canada.
            </li>
          </ul>
        </Modal>
      </ConfigProvider>
    </>
  );
};

PrivacyPolicyModal.propTypes = {
  privacyModalOpen: PropTypes.bool.isRequired,
  setPrivacyModalOpen: PropTypes.func.isRequired,
};

export default PrivacyPolicyModal;
