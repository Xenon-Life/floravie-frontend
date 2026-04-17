import { useRef } from "react";
import waitingList from "../../assets/waitingList.webp";
import logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

function GetConnected() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email === "") {
      toast.error("Please enter your email address");
      return;
    }

    emailjs
      .sendForm(
        "service_8icvbbn",
        "template_95jg5tr",
        form.current,
        "D5XKb_ku7V3t4Bh0_"
      )
      .then(
        (result) => {
          toast.success("Email sent successfully");
          console.log("SUCCESS!", result);
          form.current.reset();
        
        },
        (error) => {
          toast.error("Email not sent");
          console.log("FAILED...", error);
          console.log("Error status: ", error.status);
          console.log("Error text: ", error.text);
        }
      );
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between md:justify-center">
        <div className="w-1/2 h-screen hero-section-color md:flex md:w-full md:h-fit">
          <div className="w-10/12 m-auto md:w-11/12 flex flex-col md:gap-24">
            <div className="mt-3 md:mt-1 mb-8 md:mb-1">
              <img src={logo} alt="Site Logo ..." />
            </div>

            <div className="md:h-screen md:w-full md:flex md:flex-col md:justify-start md:items-center h-auto">
              <h2 className="text-4xl font-bold md:text-2xl md:text-center leading-snug primary-color">
                Get Connected
              </h2>

              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Enter First Name"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="text"
                  required
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Email Address"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="country"
                  name="country"
                  required
                  placeholder="Enter Country"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="text"
                  required
                  name="practice"
                  placeholder="Enter Practice Name"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="text"
                  name="practiceArea"
                  required
                  placeholder="Enter Practice Area (OB/GYN, etc.)"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                <input
                  type="text"
                  name="credientials"
                  required
                  placeholder="Credentials* (MD, etc.)"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-4 md:mb-2 mr-6 focus:outline-none px-4 md:w-full md:px-3 md:py-1.5"
                />
                
                <div className="flex gap-6 md:text-center">
                  <button
                    className="get-started-button px-14 py-3 md:px-8 md:text-xs text-center"
                    type="submit"
                  >
                    Get Connected
                  </button>
                  <Link to="/">
                    <button className="get-started-button px-8 py-3 md:px-8 md:text-xs">
                      Go Back
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-end items-end bg-black md:hidden">
          <img
            src={waitingList}
            alt="..."
            className="flex w-screen h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default GetConnected;
