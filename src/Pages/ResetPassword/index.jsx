import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import logo from "../../assets/logo.svg";
import { BsArrowLeft } from "react-icons/bs";

import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/resetpassword`,
        { ...values, token }
      );
      toast.success(response.data.message);
      toast.success("password change successful!");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-screen">
        {/* Top Left Section */}
        <div className="absolute top-0 left-0 mt-3 mb-2 flex items-center gap-4 ml-4">
          <Link to="/">
            <BsArrowLeft fontSize={24} className="cursor-pointer" />
          </Link>
          <img src={logo} alt="Site Logo ..." width={96} />
        </div>

        {/* Rest of your content (form etc.) */}
        <div className="flex justify-center items-center h-full ">
          <div className="w-full max-w-md  p-2 rounded-lg shadow-lg">
            <Form onFinish={handleSubmit}>
              <div className="w-[100%] sm:w-full m-2 p-2">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter a new password!" },
                  ]}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="get-started-button px-14 py-1 md:px-14 md:py-1.5 md:text-base text-center"
                  loading={isLoading}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
