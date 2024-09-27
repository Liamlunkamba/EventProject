import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import EventsNavbar from "./components/EventsNavbar/EventsNavbar";
import EventsHomePage from "./components/EventsHomepage/EventsHomepage";
import FindAllEvents from "./components/FindAllEvents/FindAllEvents";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CardDetail from "./components/Card/CardDetail";
import { AuthProvider } from "./components/auth/AuthContext";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    }
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <div
          id="google_translate_element"
          style={{
            textAlign: "right",
            padding: "2px",
            position: "relative",
            zIndex: 1500,
          }}
        ></div>

        {location.pathname !== "/admin" && <EventsNavbar />}
        {/*  now going to add routes to the navbar */}
        <Routes>
          <Route path="/" element={<EventsHomePage />} />
          <Route path="/findAllEvents" element={<FindAllEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/card/:id" element={<CardDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
