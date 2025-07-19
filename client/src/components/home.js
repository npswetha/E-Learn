import { useEffect, useContext, useState } from "react";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import LoggedInNavBar from "../components/LoggedInNavBar";
import { AuthContext } from "../context/AuthContext";
import "../styles/home.css";

function HomeAfterLogin() {
  const { user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handleBack = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  return (
    <div className="home-logged-in">
      <LoggedInNavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <Courses  searchInput={searchInput}/>
      <Footer />
    </div>
  );
}

export default HomeAfterLogin;
