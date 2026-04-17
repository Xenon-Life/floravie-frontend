import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import SideBar from "../Components/Sidebar/SideBar";
import { Layout } from "antd";
import { ScreenLoader } from "../Components/Loaders";
import NavigationHeader from "../Components/NavigationHeader/NavigationHeader";
import { items } from "../Components/Sidebar/SideBar";
const { Content } = Layout;

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [screenTitle, setScreenTitle] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentItem = items.find((item) => item.path === location.pathname);
    if (currentItem) {
      setScreenTitle(currentItem.label);
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/validate-token`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data);
          } else if (response.status === 403) {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/sign-in");
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/sign-in");
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/sign-in");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/sign-in");
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <ScreenLoader />;
  }

  return isAuthenticated ? (
    <UserContext.Provider value={user}>
      <Layout
        style={{ height: "100vh", overflow: "hidden" }}
        className="flex gap-4 md:gap-1 w-[98%] md:w-[100%] mx-auto mt-3 md:mt-2 bg-white"
      >
        <SideBar />
        <Layout
          style={{ overflowY: "auto", flex: 1, backgroundColor: "white" }}
        >
          <NavigationHeader screenTitle={screenTitle} />
          <Content
            style={{ overflowY: "auto" }}
            className="no-scrollbar w-[99%]"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </UserContext.Provider>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoutes;
