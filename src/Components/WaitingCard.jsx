import { Link } from "react-router-dom";
import waitingListCard from "../assets/waitingListCard.webp";

function WaitingCard() {
  return (
    <div className="flex w-full justify-between gray-color">
      <div className="flex justify-center items-center flex-col px-32 md:px-3 w-1/2 md:w-full pt-24 md:pt-5 h-full">
        <p className="primary-color text-3xl font-bold mb-4 text-center md:text-xl">
          Start your journey for better health
        </p>
        <p className="text-base text-center mb-8 md:text-xs">
          Accessible healthcare in your hands
        </p>
        <div>
          <div className="flex justify-center md:mb-8">
            <Link to="/sign-up">
              <button className="get-started-button px-14 py-3 z-10 md:text-xs md:py-2 md:px-6">
                Join Our Community
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 md:hidden">
        <img src={waitingListCard} alt="..." className="h-full" />
      </div>
    </div>
  );
}

export default WaitingCard;
