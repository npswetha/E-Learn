import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoggedInNavbar from "../components/LoggedInNavBar";
import Footer from "../components/Footer";
import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/enroll/${user._id}`);
        const data = await res.json();
        setEnrolledCourses(data);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  if (!user) return <p>Please login to see your courses.</p>;

  return (
    <div>
      <LoggedInNavbar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="courses">
        <h2 className="grid-label">My Courses</h2>
        <div className="course-list">
          {enrolledCourses.length === 0 ? (
  <p>You haven’t enrolled in any courses yet.</p>
) : (
  enrolledCourses
    .filter((course) => course) // Filter out null or undefined
    .map((course) => (
      <div key={course._id} className="course-card">
        <div className="course-image">
          <img
            src={course?.imageUrl || "/images/learning-illustration.png"}
            alt={course?.courseTitle || "Course"}
          />
        </div>
        <div className="course-info">
          <h3>{course?.courseTitle || "Untitled"}</h3>
          <div
            className="course-description"
            dangerouslySetInnerHTML={{
              __html:
                course?.courseDescription?.length > 150
                  ? course.courseDescription.substring(0, 150) + "..."
                  : course?.courseDescription || "No description available.",
            }}
          />
          <button className="enroll-button" onClick={()=>navigate(`/learn/${course._id}`)}>Learn</button>
        </div>
      </div>
    ))
)}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCourses;
