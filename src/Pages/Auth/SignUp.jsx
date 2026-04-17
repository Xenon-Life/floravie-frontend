import { useState } from "react";
import axios from "axios";
import waitingList from "../../assets/waitingList.webp";
import logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Select, Checkbox } from "antd";
import googleIcon from "../../assets/google.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ButtonLoader } from "../../Components/Loaders";
import { BsArrowLeft } from "react-icons/bs";
import ReactSelect  from "react-select";
import countries from "world-countries";
// Prepare country options for dropdown
const countryOptions = countries.map((country) => ({
  value: country.cca2, // Country Code
  label: country.name.common, // Country Name
}));

// Practice options
const practiceOptions = [
  { value: "Gynecologist", label: "Gynecologist" },
  { value: "Dermatologist", label: "Dermatologist" },

  { value: "Psychologist", label: "psychologist" },
];
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        isDoctor: isDoctor,
        country: isDoctor ? values.country.value : null,
        practice: isDoctor ? values.practice : null,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        payload
      );
      if (response.status === 200) {
        toast.success("You Have Registered Successfully!");
        setValue("");
        form.resetFields();
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        toast.error("Registration Failed!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email Already Exists!");
        } else {
          toast.error("Registration Failed! (Server Error)");
        }
      }
      console.log(error);
    } finally {
      setIsLoading(false); // Ensures the loader stops in any case
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleGoogleLogin = async () => {
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
      <div className="flex justify-between h-screen md:justify-center">
        <div className="w-1/2 h-full hero-section-color md:flex md:w-full md:h-screen overflow-y-scroll">
          <div className="w-10/12 m-auto md:w-11/12 flex flex-col md:gap-6">
            <div className="mt-3 md:mt-1 mb-2 md:mb-1 flex items-center gap-4">
              <Link to="/">
                <BsArrowLeft fontSize={24} className=" cursor-pointer" />
              </Link>
              <img src={logo} alt="Site Logo ..." width={96} />
            </div>

            <div className="h-full md:h-full flex flex-col md:w-full md:flex md:flex-col justify-center items-center md:justify-start md:items-center">
              <h2 className="text-3xl font-bold md:text-2xl md:text-center mb-2 md:mb-1 leading-snug primary-color">
                Register
              </h2>
              <Form
                onFinish={onFinish}
                form={form}
                onFinishFailed={onFinishFailed}
                className="flex w-full flex-col justify-center items-center"
              >
                {/* Name Field */}
                <div className="w-8/12 md:w-full">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Name:
                  </label>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name",
                      },
                    ]}
                    className="bg-gray-200"
                  >
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="rounded-lg py-2  primary-color-border outline-none focus:border-primary-color w-full px-4 mb-0 md:mb-1"
                    />
                  </Form.Item>
                </div>

                {/* Email Field */}
                <div className="w-8/12 md:w-full">
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
                      placeholder="Enter Email Address"
                      className="rounded-lg py-2  primary-color-border outline-none focus:border-primary-color w-full px-4 mb-0 md:mb-1"
                    />
                  </Form.Item>
                </div>

                <div className="w-8/12 md:w-full">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Password:
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    ]}
                  >
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="rounded-lg py-2  primary-color-border outline-none focus:border-primary-color w-full px-4 mb-0 md:mb-1"
                    />
                  </Form.Item>
                </div>

                {/* Phone Number Field */}
                <div className="w-8/12 md:w-full mb-1.5">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Enter Phone Number:
                  </label>
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number",
                      },
                    ]}
                  >
                    <div className="custom-phone-number bg-white rounded-lg">
                      <PhoneInput
                        value={value}
                        onChange={setValue}
                        defaultCountry="CA"
                        placeholder="Enter phone number"
                        className="phone-input rounded-lg py-2 primary-color-border outline-none focus:border-primary-color w-full px-4 mb-0 md:mb-1"
                      />
                    </div>
                  </Form.Item>
                  {/* <p>Already Have an Account? </p> */}
                </div>
                <div className="w-8/12 md:w-full">
                  <label className="mb-2 pl-2 font-semibold text-sm">
                    Enter Age:
                  </label>
                  <Form.Item
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Please select your age range",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Type"
                      className="w-3/12 mr-2 border-none md:w-11/12 md:mb-2 ring-1 rounded-[8px] ring-[#8e5ba6]"
                      size="large"
                      options={[
                        {
                          value: "1",
                          label: "19-25",
                        },
                        {
                          value: "2",
                          label: "26-35",
                        },
                        {
                          value: "3",
                          label: "35-50",
                        },
                        {
                          value: "4",
                          label: "50-65",
                        },
                        {
                          value: "5",
                          label: "65+",
                        },
                      ]}
                      onChange={(value, option) => {
                        form.setFieldsValue({ age: option.label });
                      }}
                    />
                  </Form.Item>
                </div>

                {/* Checkbox to Sign up as Doctor */}
                <div className="w-8/12 md:w-full mb-2">
                  <Form.Item name="isDoctor">
                    <Checkbox
                      checked={isDoctor}
                      onChange={(e) => setIsDoctor(e.target.checked)}
                    >
                      Sign up as Doctor
                    </Checkbox>
                  </Form.Item>
                </div>

                {/* Country Dropdown (shown only if doctor is selected) */}
                {isDoctor && (
                  <div className="w-8/12 md:w-full mb-1.5">
                    <label className="mb-2 pl-2 font-semibold text-sm">
                      Select Country:
                    </label>
                    <Form.Item
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: "Please select your country",
                        },
                      ]}
                    >
                      <ReactSelect
                        options={countryOptions}
                        placeholder="Select Country"
                        className="phone-input rounded-lg primary-color-border outline-none focus:border-primary-color w-full"
                      />
                    </Form.Item>
                  </div>
                )}

                {/* Practice Dropdown (shown only if doctor is selected) */}
                {isDoctor && (
                  <div className="w-8/12 md:w-full mb-1.5">
                    <label className="mb-2 pl-2 font-semibold text-sm">
                      Practice Name:
                    </label>
                    <Form.Item
                      name="practice"
                      rules={[
                        {
                          required: true,
                          message: "Please select your practice",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Practice"
                        className="w-3/12 mr-2 border-none md:w-11/12 md:mb-2 ring-1 rounded-[8px] ring-[#8e5ba6]"
                        size="large"
                        options={practiceOptions}
                        onChange={(value, option) => {
                          form.setFieldsValue({ practice: option.label });
                        }}
                      />
                    </Form.Item>
                  </div>
                )}

                <div className="flex gap-6 mb-2 md:mb-2 md:text-center ">
                  <Button
                    className="get-started-button px-14 py-2.5 md:px-14 md:text-lg text-center"
                    type="submit"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Register
                  </Button>
                </div>

                <div className="primary-color font-bold mb-2 md:mb-2">
                  <p>Or</p>
                </div>
              </Form>

              {/* Google Sign-In Button */}
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

              {/* Link to Sign-In */}
              <div className="flex justify-center items-center gap-2 text-sm md:mb-8 mb-10">
                <p>Already Have an Account? </p>
                <Link className="primary-color font-semibold" to="/sign-in">
                  Sign-In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-1/2 flex h-full justify-end items-end bg-black md:hidden">
          <img
            src={waitingList}
            alt="..."
            className="flex w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
