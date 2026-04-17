import "./App.css";
import HomeScreen from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Auth/PrivateRoutes";
import WomenHealth from "./Pages/WomenHealth/index.jsx";
import AboutUs from "./Pages/AboutUs/index.jsx";
import Services from "./Pages/Services/index.jsx";
import WaitingList from "./Pages/WaitingListPage/index.jsx";
import GetConnected from "./Pages/GetConnectedPage/index.jsx";
import SignUp from "./Pages/Auth/SignUp.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Dashboard from "./Pages/Dashboard";
import HealthAssistant from "./Pages/HealthAssistant/index.jsx";
import GoogleAuth from "./Pages/Auth/GoogleAuth.jsx";
import CycleTracker from "./Pages/CycleTracker";
import MoodTracker from "./Pages/MoodTracker/index.jsx";
import SymptomsTracker from "./Pages/SymptomsTracker/SymptomsTracker.jsx";
import ResetPassword from "./Pages/ResetPassword/index.jsx";
import AdminDashboard from "./Pages/AdminDashboard/index.jsx";
import AdminRoutes from "./Auth/AdminRoutes.jsx";
import AllUser from "./Pages/AllUser/index.jsx";
import Quizzes from "./Pages/Quizzes/index.jsx";
import Community from "./Pages/Community/index.jsx";
import PostDetail from "./Pages/Community/PostDetail.jsx";
import PrivateChat from "./Pages/Community/PrivateChat.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/our-services" element={<Services />}></Route>
          <Route path="/women-health" element={<WomenHealth />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/waiting-list" element={<WaitingList />}></Route>
          <Route path="/get-connected" element={<GetConnected />}></Route>

          <Route path="/sign-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>

          <Route path="/auth/callback" element={<GoogleAuth />}></Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/health-assistant" element={<HealthAssistant />} />

            <Route path="/cycle-tracker" element={<CycleTracker />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            
            <Route path="/symptoms-tracker" element={<SymptomsTracker />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/post/:id" element={<PostDetail />} />
            <Route path="/community/chat/:conversationId" element={<PrivateChat />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/allusers" element={<AllUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
