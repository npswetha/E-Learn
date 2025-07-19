import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/LearnCourse.css";

const LearnCourse = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null); // for embedded playback

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="learn-course">
      <h2>{course.courseTitle}</h2>
      <div
        className="course-description"
        dangerouslySetInnerHTML={{ __html: course.courseDescription }}
      />

      {/* Embedded video player */}
      {currentVideoUrl && (
        <div className="youtube-video">
          <iframe
            width="100%"
            height="400"
            src={currentVideoUrl.replace("youtu.be/", "www.youtube.com/embed/")}
            title="Lecture Video"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      )}

      {course.courseContent?.map((chapter, index) => (
        <div key={chapter.chapterId || index} className="chapter">
          <h3>📘 {chapter.chapterTitle}</h3>
          {chapter.chapterContent?.map((lecture, idx) => (
            <div key={lecture.lectureId || idx} className="lecture">
              <div className="lecture-info">
                <div className="lecture-title">{lecture.lectureTitle}</div>
                <div className="lecture-duration">
                  Duration: {Math.round(lecture.lectureDuration / 60)} min
                </div>
                <button
                  className="watch-button"
                  onClick={() => {
                    if (lecture.lectureUrl) {
                      setCurrentVideoUrl(lecture.lectureUrl);
                    } else {
                      alert("No video available for this lecture.");
                    }
                  }}
                >
                  Watch Video
                </button>
                {lecture.isPreviewFree && (
                  <span className="preview-badge">Free Preview</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LearnCourse;
