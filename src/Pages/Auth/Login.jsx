import axios from "axios";
import { useState } from "react";
import { Button, Divider, Form } from "antd";
import waitingList from "../../assets/waitingList.webp";
import logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google.png";
import { ButtonLoader } from "../../Components/Loaders";
import { BsArrowLeft } from "react-icons/bs";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
        values
      );
      if (response.status === 200) {
        form.resetFields();
        toast.success("Welcome!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        const role = response.data.payload.role; // Get the user's role from the response payload

        if (role === "admin") {
          // Redirect to admin dashboard
          navigate("/admin");
        } else {
          // Redirect to home page
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      } else {
        toast.error("Login Failed!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email Already Exists!");
        } else {
          toast.error("Login Failed!");
        }
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <>
      <style>
        {`
    div::-webkit-scrollbar {
      display: none;
    }
  `}
      </style>
      <ToastContainer />
      {/* <div>
        {initialFormModal && (
          <InitialForm
            userId={userId}
            initialFormModal={initialFormModal}
            setInitialFormModal={setInitialFormModal}
          />
        )}
      </div> */}
      <div className="flex justify-between md:justify-center">
        <div className="w-1/2 h-screen hero-section-color md:flex md:w-full md:h-screen overflow-y-scroll">
          <div className="w-10/12 m-auto md:w-11/12 flex flex-col md:gap-8">
            <div className="mt-3 md:mt-1 mb-8 md:mb-2 flex gap-4 items-center">
              <Link to="/">
                <BsArrowLeft fontSize={24} className=" cursor-pointer" />
              </Link>
              <img src={logo} alt="Site Logo ..." />
            </div>

            <div className="h-full py-10 md:py-0 md:h-full flex flex-col md:w-full md:flex md:flex-col justify-center items-center md:justify-start md:items-center">
              <h2 className="text-3xl font-bold md:text-2xl md:text-center mb-8 md:mb-2 leading-snug primary-color">
                Login
              </h2>

              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="flex w-full flex-col justify-center items-center"
              >
                <div className="w-8/12 md:w-full mb-3">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Email:
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email Address"
                      className="rounded-2xl py-3 primary-color-border outline-none focus:border-primary-color w-full px-4 mb-1 md:mb-2"
                    />
                  </Form.Item>
                </div>

                <div className="w-8/12 md:w-full mb-2">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Password:
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="rounded-2xl py-3 primary-color-border outline-none  focus:border-primary-color w-full px-4 mb-1 md:mb-2"
                    />
                  </Form.Item>
                </div>

                <div className="flex gap-6 md:text-center">
                  <Button
                    htmlType="submit"
                    className="get-started-button px-14 py-1 md:px-14 md:py-1.5 md:text-base text-center"
                    type="submit"
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </div>
              </Form>

              <div className="w-8/12 md:w-full">
                <Divider
                  style={{ borderColor: "#8e5ba6" }}
                  className="w-[24px]"
                />
              </div>

              <button
                className="py-2.5 px-3 flex justify-center items-center hover:bg-[#8e5ba6] hover:text-white gap-4 primary-color-border border-2 w-8/12 md:w-full rounded-3xl mb-3 md:mb-2"
                onClick={handleGoogleLogin}
              >
                {googleLoading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <img
                      src={googleIcon}
                      alt="google icon..."
                      width={24}
                      height={24}
                    />
                    <p className="text-base">Sign-In with Google</p>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-2 text-sm mb-2">
                <p>Don&#39;t Have an Account? </p>

                <Link className="primary-color font-semibold" to="/sign-up">
                  Sign-Up
                </Link>
              </div>
              <ForgotPassword />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-end items-end bg-black md:hidden">
          <img
            src={waitingList}
            alt="....."
            className="flex w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
