import { useEffect, useState } from "react";
import {
  EnvironmentOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { MdBloodtype, MdOutlineLogout } from "react-icons/md";
import userIcon from "../../assets/userIcon.png";
import { useUser } from "../../Auth/PrivateRoutes";
import { MdMood } from "react-icons/md";
import { LuStethoscope } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";

const { Sider } = Layout;

function getItem(label, key, icon, path) {
  return {
    key,
    icon,
    label,
    path,
  };
}

export const items = [
  getItem("Dashboard", "1", <HomeOutlined />, "/home"),
  getItem("Health Assistant", "2", <WechatWorkOutlined />, "/health-assistant"),
  getItem("Cycle Tracker", "3", <MdBloodtype />, "/cycle-tracker"),
  getItem("Mood Tracker", "4", <MdMood />, "/mood-tracker"),
  getItem("Symptoms Tracker", "5", <LuStethoscope />, "/symptoms-tracker"),
  getItem("Quizzes", "6", <HiOutlineClipboardList />, "/quizzes"),
  getItem("Community", "7", <HiOutlineUsers />, "/community"),
  getItem("Clinic Locator", "8", <EnvironmentOutlined />, "/clinic-locator"),
];

export default function SideBar() {
  const userInfo = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  useEffect(() => {
    const currentItem = items.find((item) => item.path === location.pathname);
    if (currentItem) {
      setSelectedKey(currentItem.key);
    }
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    console.log("logout pressed");
  };

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth < 900) {
        setSidebarWidth(140);
      } else {
        setSidebarWidth(240);
      }
    };

    // Call it initially to set the correct width
    updateSidebarWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateSidebarWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSidebarWidth);
    };
  }, []);
  return (
    <>
      <Sider
        width={sidebarWidth}
        style={{
          backgroundColor: "#FFE8E6",
          position: "sticky",
          height: "97vh",
          overflowY: "auto",
        }}
        collapsed={collapsed}
        className="rounded-[15px] md:rounded-none md:rounded-r-[15px] md:rounded-l-none md:-w[60px] md:w-16"
        collapsedWidth={60}
      >
        <div className="overflow-auto">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined style={{ fontSize: "24px" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "24px",
              width: "100%",
            }}
            className="h-[60px] md:h-[30px] mb-4 md:mb-2"
          />
        </div>

        <div className="flex flex-col justify-between h-[85%]">
          <div className="w-full">
            {!collapsed && (
              <div className="flex justify-center items-center mb-8 md:mb-2">
                <img
                  src={logo}
                  alt="logo"
                  className="text-center object-cover md:w-[80px]"
                />
              </div>
            )}
            <Menu
              mode="vertical"
              className="w-10/12 mx-auto md:w-full md:text-xs"
              style={{
                backgroundColor: "#FFE8E6",
                fontWeight: "bold",
                border: "none",
              }}
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={items}
            />
          </div>

          <button
            className="overflow-hidden hover:animate-pulse"
            onClick={() => logout()}
          >
            <div className="bg-white px-4 md:px-1 items-center w-11/12 md:w-full mx-auto rounded-[22px] py-1.5">
              {collapsed ? (
                <MdOutlineLogout fontSize={24} className="ml-0.5 w-full" />
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 md:gap-0.5">
                    <img
                      src={userIcon}
                      alt="user img..."
                      width={32}
                      className="md-[16px]"
                    />
                    <p className="font-bold">{userInfo?.user?.username}</p>
                  </div>
                  <MdOutlineLogout fontSize={18} />
                </div>
              )}
            </div>
          </button>
        </div>
      </Sider>
    </>
  );
}
