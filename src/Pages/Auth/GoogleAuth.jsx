import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const decoded = jwtDecode(token);

    if (token) {
      localStorage.setItem("token", token);
      if (decoded.isFirstTimeUser) {
        setUserId(decoded._id);
        navigate("/home");
      } else {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } else {
      navigate("/sign-in");
    }
  }, [location, navigate]);

  return (
    <>
      <div>Loading...</div>
      {/* {initialFormModal && (
        <InitialForm
          userId={userId}
          initialFormModal={initialFormModal}
          setInitialFormModal={setInitialFormModal}
        />
      )} */}
    </>
  );
};

export default GoogleAuth;
