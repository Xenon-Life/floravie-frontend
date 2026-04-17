import chatbotCover from "../assets/chatbotCover.png";
import { Link } from "react-router-dom";

function ChatbotCard() {
  return (
    <div className="chatbot-bg">
      <div className="w-full mx-auto py-10 flex md:py-4">
        <div className="w-2/3 py-32 md:py-4 ml-[60px] md md:ml-0 md:w-full md:mx-auto md:flex md:flex-col md:justify-center md:items-center">
          <p className="text-4xl font-bold mb-4 md:text-xl md:mb-2">
            Talk With Our AI Chatbot
          </p>
          <p className="w-6/12 mb-4 md:w-11/12 md:mx-auto md:text-center md:mb-2">
            Our AI chatbot is designed to assist women with their health
            concerns, providing personalized support and guidance. Whether you
            have questions about symptoms, need advice on managing your health,
            or just want a reliable source for health information, our chatbot
            is here to help. Simply start a conversation and get the support you
            need at your fingertips. Your health and well-being are our
            priority, and our AI chatbot is always ready to listen and provide
            helpful insights.
          </p>
          <Link to="/sign-up">
            <button className="get-started-button px-4 py-3 mb-20 md:mb-6 md:py-2 md:px-2 md:text-xs text-center">
              Get Started
            </button>
          </Link>
        </div>

        <div className="c h-full py-0 md:hidden">
          <img src={chatbotCover} alt="..." />
        </div>
      </div>
    </div>
  );
}

export default ChatbotCard;
