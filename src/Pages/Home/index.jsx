/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/

import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import ellipse from "../../assets/ellipse.svg";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import journey1 from "../../assets/journey1.svg";
import journey2 from "../../assets/journey2.svg";
import journey3 from "../../assets/journey3.svg";

import { MdOutlineStar } from "react-icons/md";
import oval from "../../assets/oval.svg";
import { FaMedal } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Faqs from "../../Components/Faqs";
import ChatbotCard from "../../Components/ChatbotCard";

function HomeScreen() {
  const navigate = useNavigate();

  const navigateToServices = () => {
    navigate("/our-services");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="hero-section-color mb-16 md:mb-6">
        <NavBar />
        <div className="w-8/12 m-auto flex flex-col items-center justify-center md:w-11/12">
          <p className="mb-3 red-text">Welcome to Floravie</p>
          <div className="w-full mb-12">
            <h2 className="text-6xl font-bold text-center md:text-3xl leading-snug">
              Comprehensive Care for All Ages, Embracing Every Woman and Femme
            </h2>
          </div>
          <div className="w-full m-auto mb-6">
            <p className=" text-center mb-12 md:text-sm">
              Floravie is your dedicated AI-driven community app designed
              to address women-centric health challenges with personalized
              solutions and supportive connections. Track health, discover
              tailored health plans, expert consultations, and a supportive
              community, all at your fingertips.
            </p>
            <div className="w-full m-auto flex flex-col justify-center mb-4 ">
              <div className="flex justify-center">
                <img
                  src={ellipse}
                  alt="ellipse"
                  width={64}
                  className="absolute -mt-2 ml-40"
                />
                <Link to="/sign-in" className="z-10">
                  <button className="get-started-button px-14 py-3">
                    Join Us!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 m-auto hero-banner flex justify-end items-end md:m-justify-center">
          <div className=" flex w-full object-cover justify-between md:justify-center items-center flex-wrap mb-6 md:flex md:gap-6 md:items-center">
            <div className="white-card rounded-3xl py-6 px-5 w-1/5 min-w-[260px] mb-6 md:mb-4">
              <p className="font-bold text-4xl">95%</p>
              <p className="white-card-text text-lg font-medium">
                Success Rate
              </p>
            </div>

            <div className="white-card rounded-3xl py-6 px-5 w-1/5 min-w-[260px] mb-6 md:mb-4">
              <p className="font-bold text-4xl">1,000+</p>
              <p className="white-card-text text-lg font-medium">
                Satisfied clients
              </p>
            </div>
            <div className="white-card rounded-3xl py-6 px-5 w-1/5 min-w-[260px] mb-6 md:mb-4">
              <div className="flex items-center gap-4">
                <p className="font-bold text-4xl">4.8 </p>
                <MdOutlineStar size={28} />
              </div>
              <p className="white-card-text text-lg font-medium">
                Google reviews
              </p>
            </div>
            <div className="white-card rounded-3xl py-6 px-5 w-1/5 min-w-[260px] mb-6 md:mb-4">
              <div className="flex items-center gap-4">
                <p className="font-bold text-3xl">Top Rated</p>
                <FaMedal size={28} />
              </div>
              <p className="white-card-text text-lg font-medium">
                By healthcare experts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex w-full justify-center mb-10 md:mb-4">
          <p className="font-bold text-3xl text-center w-5/12 px-10 md:w-full md:px-0 md:mb-4">
            Comprehensive Care for Women of All Ages
          </p>
        </div>

        <div className="w-11/12 m-auto flex justify-between flex-wrap mb-10">
          <div className="info-card-one md:w-full min-w-[300px] max-h-[320px] min-h-[320px] mb-4">
            <p className="text-3xl font-medium pt-5 px-5 mb-4">
              Health tracking
            </p>
            <div className="flex flex-col justify-between min-h-56">
              <p className="text-sm font-normal w-2/3 px-5">
                Take health quiz & stay proactive about your Important health
                metrics & well-being.
              </p>
              <div className="px-5">
                <button
                  className="bg-white rounded-3xl px-5 py-2 font-semibold text-black mb-4 hover:bg-pink-400 hover:text-white"
                  onClick={() => navigateToServices()}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="info-card-two md:w-full min-w-[300px] max-h-[320px] min-h-[320px] mb-4">
            <p className="text-3xl font-medium pt-5 px-5 mb-4">
              Personalized Health Plans
            </p>
            <div className="flex flex-col justify-between min-h-56">
              <p className="text-sm font-normal w-2/3 px-5">
                Experience AI-driven system that analyzes your health data to
                create a plan that fits your lifestyle and wellness goals.
              </p>
              <div className="px-5 md:mt-28 sm:mt-12">
                <button
                  className="bg-white rounded-3xl px-5 py-2 font-semibold text-black mb-12  hover:bg-pink-400 hover:text-white"
                  onClick={() => navigateToServices()}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="info-card-three md:w-full min-w-[300px] max-h-[320px] min-h-[320px] mb-4">
            <p className="text-3xl font-medium pt-5 px-5 mb-4">
              Virtual consultation
            </p>
            <div className="flex flex-col justify-between min-h-56">
              <p className="text-sm font-normal w-11/12 md:w-9/12 px-5">
                Access expert medical advice from the comfort of your home.
                Connect with qualified healthcare professionals who can provide
                guidance and support for your health concerns.
              </p>
              <div className="px-5 mt-10">
                <button
                  className="bg-white rounded-3xl px-5 py-2 font-semibold text-black mb-4 hover:bg-pink-400 hover:text-white"
                  onClick={() => navigateToServices()}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-section-color flex w-full m-auto py-14 md:py-3 mb-0 md:mb-0 md:flex md:flex-col">
        <div className="w-5/12 flex flex-col md:flex md:w-11/12 md:m-auto">
          <div className="px-16 md:px-2 md:w-full md:flex md:justify-center md:flex-col md:text-center md:pt-3">
            <p className="text-4xl font-bold mb-10 md:text-xl md:mb-4">
              Start your Journey to uplift your health
            </p>
            <div>
              <Link to="/sign-up">
                <button className="get-started-button px-4 py-3 mb-20 md:mb-6 md:py-2 md:px-2 md:text-xs text-center">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <img src={oval} alt="" className="md:hidden" />
        </div>

        <div className="flex justify-evenly w-full md:justify-center md:flex-col">
          <div className="flex flex-col w-full justify-between items-center gap-28 md:gap-0 mb-4 md:flex-row md:flex-wrap">
            <div className="min-w-[300px] w-[33%] md:min-w-6/12 md:w-full md:flex md:flex-col justify-center items-center md:mb-6">
              <img src={journey1} alt="img..." className="mb-3" />
              <p className="text-2xl font-bold red-text-color mb-4 md:text-xl">
                What&#39;s unique about us
              </p>
              <p className="text-center md:w-11/12 md:text-xs">
                At Floravie, we prioritize your health and well-being by
                offering a holistic approach to women’s health. Our AI-powered
                platform ensures that you receive personalized, relevant, and
                timely support. With a vibrant community, and cutting-edge
                health tools, we empower you to take control of your health with
                confidence
              </p>
            </div>
            <div className="min-w-[300px] w-[33%] md:min-w-6/12 md:w-full md:flex md:flex-col justify-center items-center md:mb-6">
              <img src={journey3} alt="img..." className="mb-3" />
              <p className="text-2xl font-bold red-text-color mb-4 text-center md:text-xl">
                Over 1,000 articles & blog posts
              </p>
              <p className="text-center md:w-11/12 md:text-xs">
                Expert insight on over 40 of the most common health conditions
                women must deal with. Straight talk and useful tips, too.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="min-w-[300px] w-[33%] md:min-w-6/12 md:w-full md:flex md:flex-col justify-center items-center md:mb-6">
              <img src={journey2} alt="img..." className="mb-3" />
              <p className="text-2xl font-bold red-text-color mb-4 text-center md:text-xl">
                Health Quizzes
              </p>
              <p className="text-center md:w-11/12 md:text-xs">
                Our doctor-designed quizzes will help you find the underlying
                causes of your health problems and point you toward natural
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChatbotCard />
      <div className="w-9/12 m-auto mb-10 md:w-11/12 md:mb-4">
        <div className="py-10 md:py-4">
          <p
            className="md:text-center font-bold text-4xl mb-4 md:text-xl md:mb-2"
          >
            Our Features
          </p>
          <p className="mb-12 md:text-center">
            Investing in your health is probably the best life decisions.
          </p>
        </div>

        <div className="flex gap-8 justify-between md:gap-0 md:w-full md:flex-col md:justify-center md:items-center">
          <div className="w-10/12 md:flex md:flex-col md:w-full">
            <div className="flex justify-start items-center checkbox-rad px-5 py-4 mb-10 gap-4">
              <RiCheckboxCircleFill size={20} />
              <p>Personalized Healthcare Plans</p>
            </div>
            <div className="flex justify-start items-center checkbox-rad px-5 py-4 mb-10 gap-4">
              <RiCheckboxCircleFill size={20} />
              <p>Women Centric Community Support</p>
            </div>
            <div className="flex justify-start items-center checkbox-rad px-5 py-4 mb-10 gap-4">
              <RiCheckboxCircleFill size={20} />
              <p>Virtual Exploration & Consultation</p>
            </div>
          </div>
          <div className="w-11/12 gray-color rounded-3xl px-8 py-5 md:w-full">
            <p className="font-medium mb-4">Includes:</p>
            <div className="flex justify-start items-center py-1 mb-2 gap-4">
              <IoMdCheckmark size={22} />
              <p>Swift access to women centric healthcare</p>
            </div>
            <div className="flex justify-start items-center py-1 mb-2 gap-4">
              <IoMdCheckmark size={22} />
              <p>AI driven ersonalized health exploration</p>
            </div>
            <div className="flex justify-start items-center py-1 mb-2 gap-4">
              <IoMdCheckmark size={22} />
              <p>Access to qualified health professionals</p>
            </div>
            <div className="flex justify-start items-center py-1 mb-2 gap-4">
              <IoMdCheckmark size={22} />
              <p>Virtual wellness sessions</p>
            </div>
            <div className="flex justify-start items-center py-1 mb-8 gap-4">
              <IoMdCheckmark size={22} />
              <p>Tracks your health</p>
            </div>

            <Link to="/sign-up">
              <button
                className="get-started-button-color w-full text-white py-3"
                style={{ borderRadius: "42px" }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Faqs />
      <Footer />
    </>
  );
}

export default HomeScreen;
