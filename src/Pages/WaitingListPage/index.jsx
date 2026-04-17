import { useRef } from "react";
import emailjs from "emailjs-com";
import waitingList from "../../assets/waitingList.webp";
import logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function WaitingList() {
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
          <div className="w-10/12 m-auto md:w-11/12 flex flex-col gap-12 md:gap-3">
            <div className="mt-3 md:mt-1">
              <img src={logo} alt="Site Logo ..." />
            </div>

            <div className="md:h-screen md:w-full md:flex md:flex-col md:justify-center md:items-center">
              <h2 className="text-6xl font-bold md:text-2xl md:text-center leading-snug primary-color">
                Queens👑,
                <br /> Start your journey for better health
              </h2>
              <p className="font-normal md:mb-4 md:text-base md:text-center mb-10">
                Accessible healthcare in your hands
              </p>

              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="rounded-2xl py-3 primary-color-border focus:border-primary-color w-4/6 mb-10 md:mb-6 mr-6 focus:outline-none px-4 md:w-full"
                />
                <div className="flex gap-6">
                  <button
                    className="get-started-button px-12 py-3 md:px-8 md:text-xs"
                    type="submit"
                  >
                    Join Our Waiting List
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

export default WaitingList;
