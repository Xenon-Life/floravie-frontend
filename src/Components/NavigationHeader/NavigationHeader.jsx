import PropTypes from "prop-types";
import { Header } from "antd/es/layout/layout";
import { useUser } from "../../Auth/PrivateRoutes";

function NavigationHeader({ screenTitle }) {
  const userInfo = useUser();
  return (
    <Header className="rounded-[15px] bg-[#FFE8E6] flex items-center mb-6 md:mb-2 md:h-10">
      <h1 className="text-black font-bold text-2xl md:text-base">
        {screenTitle === "Dashboard"
          ? `Welcome  ${userInfo?.user?.username}!`
          : screenTitle}
      </h1>
    </Header>
  );
}

export default NavigationHeader;
NavigationHeader.propTypes = {
  screenTitle: PropTypes.string.isRequired,
};
