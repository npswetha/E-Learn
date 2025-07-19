import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Courses.css";
import useEnrollments from '../hooks/useEnrollments';
import { useNavigate } from "react-router-dom";

function Courses({ searchInput }) {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const { enrolledCourses, enrollInCourse, isEnrolled } = useEnrollments(user);
  const navigate = useNavigate();
  const handleEnroll = async (courseId) => {
  if (!user) {
    navigate('/login');
    return;
  }
  try {
    await enrollInCourse(courseId);
    alert('Successfully enrolled!');
  } catch (err) {
    console.error(err);
    alert('Enrollment failed');
  }
};

  useEffect(() => {
    const url = searchInput.trim()
      ? `http://localhost:5000/api/courses?search=${encodeURIComponent(searchInput)}`
      : 'http://localhost:5000/api/courses';

    fetch(url)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error fetching courses:', err));
  }, [searchInput]); // 🔁 Runs again whenever searchInput changes

  return (
    <div className="courses">
      <h1>
        {user ? `Welcome back, ${user.name || "Learner"}!` : "Explore Our Courses"}
      </h1>
      <div className="course-list">
        {courses.length === 0 ? (
          <p>No courses found for "{searchInput}"</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-image">
                <img
                  src={course.imageUrl || "/images/learning-illustration.png"}
                  alt={course.courseTitle || "Course"}
                />
              </div>
              <div className="course-info">
                <h3>{course.courseTitle || "Untitled Course"}</h3>
                <div
                  className="course-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      course.courseDescription?.length > 150
                        ? course.courseDescription.substring(0, 150) + "..."
                        : course.courseDescription || "No description available.",
                  }}
                />
                <button className="enroll-button" onClick={() => {
                   if (isEnrolled(course._id)) {
                     navigate(`/learn/${course._id}`); // ✅ Go to LearnCourse.js page
                   } else {
                       handleEnroll(course._id); // ✅ Otherwise enroll
                 }
                }}>
                 {isEnrolled(course._id) ? "Learn" : "Enroll Now"}
                 </button>


              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Courses;
