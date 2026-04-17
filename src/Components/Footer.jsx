import { useState } from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

function Footer() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <>
      <footer className=" footer-bg text-white py-10">
        <div className="w-6/12 md:w-9/12 m-auto mb-10">
          <div className=" flex w-full md:text-xs mb-5 md:mb-3">
            <div className="font-medium flex justify-between w-full md:flex-wrap md:justify-evenly md:gap-4 items-center">
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="mb-5 md:mb-3 md:text-xs "
              >
                Home
              </Link>
              <Link
                to="/our-services"
                onClick={() => window.scrollTo(0, 0)}
                className="mb-5 md:mb-3 md:text-xs "
              >
                Our Services
              </Link>
              <Link
                to="/women-health"
                onClick={() => window.scrollTo(0, 0)}
                className="mb-5 md:mb-3 md:text-xs"
              >
                Women Health
              </Link>
              <Link
                to="/about-us"
                onClick={() => window.scrollTo(0, 0)}
                className="mb-5 md:mb-3 md:text-xs"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="md:text-xs background-white-opacity rounded-2xl px-3 py-3 mb-5 md:mb-3">
            <p className="footer-heading-color mb-4 md:mb-2 text-center">
              Email:
            </p>
            <p className="mb-5 md:mb-3 text-center">Connect@floravie.com</p>
          </div>

          <div className="flex gap-3 justify-center items-center mb-5 md:mb-3">
            <a
              href="https://www.facebook.com/floravie"

              rel="noreferrer"
              target="_blank"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              rel="noreferrer"
              target="_blank"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/floravie/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          <div className="flex justify-center items-center gap-6 md:gap-3 md:text-xs md:flex  md:flex-wrap md:items-center md:w-full">
            <button onClick={() => setPrivacyModalOpen(true)}>
              Privacy Policy
            </button>
            <button onClick={() => setTermsModalOpen(true)}>
              Terms of Service
            </button>
            <button>Cookies Settings</button>
          </div>
        </div>
        <hr className="h-px my-8 w-11/12 m-auto bg-white border-0" />
        <div className="w-11/12 m-auto flex justify-center items-center md:justify-start md:w-full flex-wrap text-xs">
          <div className="md:text-xs md:flex md:justify-center md:items-center md:w-full md:mb-8">
            <p>© 2024 Floravie All rights reserved.</p>
          </div>
        </div>
        {privacyModalOpen && (
          <PrivacyPolicyModal
            privacyModalOpen={privacyModalOpen}
            setPrivacyModalOpen={setPrivacyModalOpen}
          />
        )}
        {termsModalOpen && (
          <TermsAndConditionsModal
            termsModalOpen={termsModalOpen}
            setTermsModalOpen={setTermsModalOpen}
          />
        )}
      </footer>
    </>
  );
}

export default Footer;
