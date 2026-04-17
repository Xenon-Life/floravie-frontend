import PropTypes from "prop-types";
import { Empty } from "antd";

const EmptyDataBox = ({ description }) => (
  <div>
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      
      className="w-full flex flex-col justify-center items-center"
      description={<p className="text-[#8e5ba6] md:text-xs">{description}</p>} // Added margin-top for spacing
    />
  </div>
);

export default EmptyDataBox;

EmptyDataBox.propTypes = {
  description: PropTypes.string.isRequired,
};
