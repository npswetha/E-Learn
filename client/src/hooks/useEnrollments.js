import { useState, useEffect } from 'react';

const useEnrollments = (user) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
  if (!user?._id) return;

  fetch(`http://localhost:5000/api/enrollments/${user._id}`)
    .then((res) => res.json())
    .then((data) => {
      const enrolledIds = data.map((e) => e.courseId);
      setEnrolledCourses(enrolledIds);
    })
    .catch((err) => console.error("Error fetching enrolled courses:", err));
}, [user?._id]); // ✅ safer check


  const enrollInCourse = async (courseId) => {
    const res = await fetch("http://localhost:5000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, courseId }),
    });

    if (res.ok) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      return true;
    } else {
      throw new Error("Enrollment failed");
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  return { enrolledCourses, enrollInCourse, isEnrolled };
};

export default useEnrollments;
