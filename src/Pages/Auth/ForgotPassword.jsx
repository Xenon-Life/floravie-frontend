import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgotPassword`,
        values
      );
      toast.success(response.data.message);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="link"
        onClick={showModal}
        className="primary-color font-semibold"
      >
        Forgot Password?
      </Button>
      <Modal
        title="Forgot Password"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
            className="get-started-button px-14 py-1 md:px-14 md:py-1.5 md:text-base text-center"
          >
            Send Reset Link
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default ForgotPassword;
