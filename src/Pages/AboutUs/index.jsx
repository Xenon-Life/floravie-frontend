import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import WaitingCard from "../../Components/WaitingCard";
import aboutUsBanner from "../../assets/aboutUsBanner.png";
import aboutUsThree from "../../assets/aboutUsThree.svg";
import aboutUsTwo from "../../assets/aboutUsTwo.svg";

import aboutUsOne from "../../assets/aboutUsOne.svg";
import aboutUsEmpathy from "../../assets/aboutUsEmpathy.svg";
import aboutUsAccessibility from "../../assets/aboutUsAccessibility.svg";
import aboutUsCommunity from "../../assets/aboutUsCommunity.svg";

function AboutUs() {
  return (
    <>
      <div className="hero-section-color mb-20">
        <NavBar />
        <div className="w-11/12 m-auto flex items-center justify-center">
          <div className="w-6/12 mb-12 flex flex-col md:w-full">
            <p className="mb-3 red-text md:text-center">
              Welcome to Floravie
            </p>
            <h2 className="text-6xl font-bold leading-snug z-10 md:text-center md:text-3xl">
              About Us
            </h2>
            <p>
              Floravie is dedicated to revolutionizing women’s health by
              offering an integrated digital platform that supports physical and
              mental well-being throughout every stage of life.
            </p>
          </div>
          <div className="w-6/12 md:hidden">
            <img src={aboutUsBanner} className="w-full object-cover" alt="" />
          </div>
        </div>
      </div>

      <div className="about-us-bg-color py-20 w-full md:pt-0 mb-16 md:mb-8">
        <div>

          <div className="flex w-8/12 m-auto gap-16 md:gap-0 md:flex-col-reverse md:w-9/12 h-full md:mb-24 mb-16 footer-bg rounded-3xl px-5 py-4 md:px-0 md:py-3">
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto justify-center px-5 md:px-0">
              <p className="text-3xl font-bold text-white w-8/12 mb-12 md:text-xl md:w-full md:text-center text-left md:mb-8">
                Our Mission
              </p>
              <p className="text-base mb-5 text-white text-left md:text-center md:text-sm md:mb-3">
                Our mission is to empower women by providing comprehensive and
                personalized health solutions through innovative technology and
                a supportive community. We are dedicated to improving women’s
                health and well-being by offering tailored health plans, expert
                consultations, and a space for connection and support.
              </p>
            </div>
            <div className="w-6/12 flex md:w-full h-full md:mb-4">
              <img
                src={aboutUsOne}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom "
              />
            </div>
          </div>


        </div>
        <div className="mb-white w-11/12 m-auto bg-white py-16 md:py-0">
          <div className="w-8/12 m-auto md:w-11/12 md:flex-col h-full md:mb-8 mb-16">
            <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
              Our Values
            </p>
            <p className="text-base mb-5 text-left md:text-center md:mb-3">
              We envision a world where every woman has access to the resources
              and support she needs to achieve optimal health and wellness.
              Through our AI-powered platform, we aim to create a global
              community where women can thrive, share their experiences, and
              receive the care they deserve.
            </p>
            <div className="flex justify-between flex-wrap md:flex-col md:justify-center items-center">
              <div className="flex-col justify-center items-center mb-3 md:mb-2 md:flex-col">
                <img
                  className="flex mb-3 md:mb-1"
                  src={aboutUsEmpathy}
                  alt="..."
                />
                <p className="font-semibold text-base md:text-base primary-color text-center">
                  Empathy
                </p>
              </div>
              <div className="flex-col justify-center items-center mb-3 md:mb-2 md:flex-col">
                <img
                  className="flex mb-3 md:mb-1"
                  src={aboutUsCommunity}
                  alt="..."
                />
                <p className="font-semibold text-base md:text-base primary-color text-center">
                  Community
                </p>
              </div>
              <div className="flex-col justify-center items-center mb-3 md:mb-2 md:flex-col">
                <img
                  className="flex mb-3 md:mb-1"
                  src={aboutUsAccessibility}
                  alt="..."
                />
                <p className="font-semibold text-base md:text-base primary-color text-center">
                  Accessibility
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-8/12 m-auto gap-16 md:w-full md:flex-col h-full md:mb-8 mb-16">
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={aboutUsTwo}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom "
              />
            </div>
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Our Story
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                At Floravie, we recognized a gap in personalized,
                supportive health solutions for women. Driven by the need to
                combine technology with genuine care, we created a platform
                where AI meets empathy. Our mission is to offer tailored health
                plans, expert support, and a vibrant community to women of all
                ages. Guided by our core values of empathy, community, and
                accessibility, we’re dedicated to empowering women with the
                resources they need to thrive. Join us in transforming women’s
                health through innovation and connection.
              </p>
            </div>
          </div>

          <div className="flex w-8/12 md:flex-col-reverse m-auto gap-16 md:w-full h-full md:mb-8 mb-16">
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                What We Offer
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                Floravie is more than just a healthcare platform; it’s a
                trusted partner on your health journey. We offer:
              </p>
              <ul className="text-base text-left md:text-center md:mb-3">
                <li className=" list-disc mb-3 md:mb-1">
                  Personalized Health Plans: Tailored to your unique needs and
                  powered by advanced AI.
                </li>
                <li className=" list-disc mb-3 md:mb-1">
                  Virtual Consultations: Access expert healthcare professionals
                  from the comfort of your home.
                </li>
                <li className=" list-disc mb-3 md:mb-1">
                  Community Support: Connect with other women and share
                  experiences in our expert-moderated forums and support groups.
                </li>
                <li className=" list-disc mb-3 md:mb-1">
                  Health Tracking: Monitor your menstrual cycles, mental health,
                  symptoms, and treatment effects with our intuitive tools.
                </li>
                <li className=" list-disc mb-3 md:mb-1">
                  Educational Resources: Explore a rich library of content
                  created by healthcare professionals.
                </li>
              </ul>
            </div>

            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={aboutUsThree}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
      <WaitingCard />
      <Footer />
    </>
  );
}

export default AboutUs;
