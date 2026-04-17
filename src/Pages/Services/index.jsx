import ourServicesFour from "../../assets/ourServicesFour.svg";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import ourServicesBanner from "../../assets/ourServicesBanner.png";
import ourServicesOne from "../../assets/ourServicesOne.svg";
import ourServicesTwo from "../../assets/ourServicesTwo.svg";
import ourServicesThree from "../../assets/ourServicesThree.svg";
import fif from "../../assets/fif.svg";
import WaitingCard from "../../Components/WaitingCard";

function Services() {
  return (
    <>
      <div className="hero-section-color md:mb-6">
        <NavBar />
        <div className="w-11/12 m-auto flex items-center justify-center">
          <div className="w-6/12 flex pb-16 flex-col md:w-full md:text-center">
            <p className="mb-3 red-text md:text-center">Welcome to Floravie</p>
            <h2 className="text-6xl font-bold leading-snug md:text-center md:text-3xl md:mb-3">Our Services </h2>
            <p className="md:text-center md:text-base">
              Floravie community is full of resources related to women
              health. Dive into the articles that answers your questions.
            </p>
          </div>
          <div className="w-6/12 md:hidden">
            <img
              src={ourServicesBanner}
              className="w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>


      <div className="services-page-bg py-20 w-full md:pt-0 mb-16 md:mb-8">
        <div className="mb-white w-11/12 m-auto bg-white py-16 md:py-0">
         
          <div className="flex w-8/12 m-auto gap-16 md:w-full md:flex-col h-full md:mb-8 mb-16">
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={ourServicesOne}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom "
              />
            </div>
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Personalized Health Plans
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                Your health is unique, and so are your needs. At Floravie,
                we offer Personalized Health Plans tailored to your individual
                journey. Whether you’re managing a specific condition or
                focusing on preventive care, our plans are designed to support
                your overall well-being.
              </p>

              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Customized health recommendations based on your inputs and
                  preferences.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Continuous monitoring and updates to your plan as your health
                  evolves.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Integration with other Floravie services for a holistic
                  approach.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-8/12 md:flex-col-reverse m-auto gap-16 md:w-full h-full md:mb-8 mb-16">
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Virtual Consultation
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                Get expert care without leaving the comfort of your home. Our
                Virtual Consultation service connects you with experienced
                gynecologists and mental health professionals through a secure,
                private platform. Whether you need a routine check-up, advice on
                managing symptoms, or mental health support, our specialists are
                here to help.
              </p>

              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Easy-to-schedule appointments with trusted healthcare
                  providers.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Secure video calls that protect your privacy and
                  confidentiality.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Follow-up care and continuous support to ensure your health
                  needs are met.
                </p>
              </div>
            </div>
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={ourServicesTwo}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom "
              />
            </div>
          </div>

          <div className="flex w-8/12 m-auto gap-16 md:w-full md:flex-col h-full md:mb-8 mb-16">
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={ourServicesThree}
                alt="...."
                className="w-full md:h-64 md:w-full flex md:object-bottom h-full"
              />
            </div>
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Health Tracking
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                Stay on top of your health with our comprehensive Health
                Tracking tools. Monitor everything from your menstrual cycle to
                your mental health, symptoms, and the effectiveness of
                treatments. Our intuitive tracking system helps you stay
                informed and in control, making it easier to manage your health
                daily.
              </p>

              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  User-friendly tracking for menstrual cycles, mood, symptoms,
                  and more.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Personalized insights and reminders based on your data.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Integration with your personalized health plan for seamless
                  care.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-8/12 m-auto gap-16 md:w-full md:flex-col-reverse h-full md:mb-8 mb-16">
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Community Support
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                You’re never alone on your health journey. With Community
                Support, you can connect with other women who share similar
                experiences, challenges, and goals. Our expert-moderated forums
                and support groups offer a safe, welcoming space where you can
                ask questions, share insights, and find encouragement from a
                community that truly understands.
              </p>

              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Access to a diverse, supportive community of women.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Expert moderation to ensure a positive, informative
                  environment.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Specialized groups focusing on various aspects of women’s
                  health.
                </p>
              </div>
            </div>
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={ourServicesFour}
                alt="...."
                className="w-full md:h-64 md:w-full h-full flex md:object-bottom "
              />
            </div>
          </div>

          <div className="flex w-8/12 m-auto gap-16 md:w-full md:flex-col h-full md:mb-8 mb-16">
            <div className="w-6/12 flex md:w-full md:mb-0 h-full">
              <img
                src={fif}
                alt="...."
                className="w-full md:h-64 md:w-full flex md:object-bottom h-full"
              />
            </div>
            <div className="w-6/12 flex flex-col md:w-10/12 md:justify-center md:items-center md:m-auto">
              <p className="text-3xl font-bold primary-color w-9/12 mb-12 md:text-xl md:w-full md:text-center text-left md:-mt-10 md:mb-2">
                Health Exploration
              </p>
              <p className="text-base mb-5 text-left md:text-center md:mb-3">
                Curious about your health but not sure where to start? Our
                Health Exploration ChatBot is here to guide you. This AI-powered
                tool provides instant answers to your health questions, helps
                you explore relevant topics, and directs you to the right
                resources or services within our platform. It’s like having a
                personal health assistant available 24/7.
              </p>

              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Instant access to reliable health information and advice.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Interactive exploration of topics tailored to your interests
                  and needs.
                </p>
              </div>
              <div className="gray-color rounded-2xl mb-4 md:mb-2">
                <p className="primary-color text-base p-4 md:p-2">
                  Seamless integration with other Floravie services for
                  deeper insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaitingCard />
      <Footer />
    </>
  );
}

export default Services;
