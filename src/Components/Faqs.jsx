import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

function Faqs() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    // If the clicked panel is already active, close it by setting activeIndex to -1
    // Otherwise, set it as the active panel
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="w-full about-us-bg-color py-8 md:py-4">
      <div className="w-8/12 flex justify-center flex-col items-center md:w-full m-auto">
        <p className="text-3xl md:text-xl font-bold text-center w-11/12 mb-10 md:mb-6">
          Frequently Asked Questions
        </p>
        <div className="mb-4 w-full md:w-10/12 md:mb-3">
          <button
            className={`accordion ${
              activeIndex === 0 ? "active border-faq" : "border-faq"
            }`}
            onClick={() => toggleAccordion(0)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold primary-color text-lg md:text-xs">
                What is Floravie?
              </p>
              <FaAngleDown />
            </div>
          </button>
          <div
            className="panel"
            style={{ display: activeIndex === 0 ? "block" : "none" }}
          >
            <p className="py-5 md:py-3">
              Floravie is an AI-based app dedicated to addressing women &#39;s
              health issues through personalized plans, virtual consultations,
              and community support.
            </p>
          </div>
        </div>

        <div className="mb-4 w-full md:w-10/12 md:mb-3">
          <button
            className={`accordion ${
              activeIndex === 1 ? "active border-faq" : "border-faq"
            }`}
            onClick={() => toggleAccordion(1)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold primary-color text-lg md:text-xs">
                How do I get started?
              </p>
              <FaAngleDown />
            </div>
          </button>
          <div
            className="panel"
            style={{ display: activeIndex === 1 ? "block" : "none" }}
          >
            <p className="py-5 md:py-3">
              Download the app, create your profile, and start exploring the
              features tailored to your needs. You can set up your health plan,
              book consultations, and connect with the community right away.
            </p>
          </div>
        </div>

        <div className="mb-4 w-full md:w-10/12 md:mb-3">
          <button
            className={`accordion ${
              activeIndex === 2 ? "active border-faq" : "border-faq"
            }`}
            onClick={() => toggleAccordion(2)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold primary-color text-lg md:text-xs">
                Is the virtual consultation feature secure?
              </p>
              <FaAngleDown />
            </div>
          </button>
          <div
            className="panel"
            style={{ display: activeIndex === 2 ? "block" : "none" }}
          >
            <p className="py-5 md:py-3">
              Yes, all consultations are conducted through secure channels,
              ensuring your privacy and the confidentiality of your health
              information.
            </p>
          </div>
        </div>
        <div className="mb-4 w-full md:w-10/12 md:mb-3">
          <button
            className={`accordion ${
              activeIndex === 3 ? "active border-faq" : "border-faq"
            }`}
            onClick={() => toggleAccordion(3)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold primary-color text-lg md:text-xs">
                Can I track my health metrics in the app?
              </p>
              <FaAngleDown />
            </div>
          </button>
          <div
            className="panel"
            style={{ display: activeIndex === 3 ? "block" : "none" }}
          >
            <p className="py-5 md:py-3">
              Absolutely! Our health tracking feature allows you to monitor
              various health metrics, making it easier to stay on top of your
              wellness goals.
            </p>
          </div>
        </div>
        <div className="mb-4 w-full md:w-10/12 md:mb-3">
          <button
            className={`accordion ${
              activeIndex === 4 ? "active border-faq" : "border-faq"
            }`}
            onClick={() => toggleAccordion(4)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold primary-color text-lg md:text-xs">
                How does the ChatBot work?
              </p>
              <FaAngleDown />
            </div>
          </button>
          <div
            className="panel"
            style={{ display: activeIndex === 4 ? "block" : "none" }}
          >
            <p className="py-5 md:py-3">
              Our ChatBot provides instant, reliable information and answers
              your health-related questions. It helps you navigate through
              various health topics and find the information you need quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
