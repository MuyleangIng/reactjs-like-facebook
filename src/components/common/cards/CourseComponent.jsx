// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CourseComponent = () => {
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://136.228.158.126:50001/api/courses/31222599-cb15-405a-b1cf-46ac07f007fb/')
//       .then(response => {
//         setCourseData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Course Data</h1>
//       <pre>{JSON.stringify(courseData, null, 2)}</pre>
//     </div>
//   );
// };

// export default CourseComponent;
import React, { useState } from "react";

const courseData = {
  id: "31222599-cb15-405a-b1cf-46ac07f007fb",
  course_name: "សៀវភៅគណិតវិទ្យាថ្នាក់ទី១០",
  course_description: "សៀវភៅគណិតវិទ្យាថ្នាក់ទី ១០ នេះត្រូវបានរៀបចំឡើង  ដើម្បីជួយសម្រួលដល់ “  គណនាចំនួនមធ្យម ” ដែលចូលសិក្សារបានបប្រាំបួនឆ្នាំកន្លងមក …….",
  course_thumbnail: "http://136.228.158.126:50001/media/uploads/k10Math.jpg",
  categories: [
    {
      id: "f0bc01b1-b014-4578-a72d-e6d8b82225d4",
      category_name: "ពីជគណិត",
      category_description: "សិក្យាអំពីរគណិតវិទ្យា កម្រិត១០",
      course: "31222599-cb15-405a-b1cf-46ac07f007fb",
      lessons: [
        {
          id: "2896859c-5921-48d9-b9ea-9264eb0b567b",
          lesson_title: "ចំនួនគត់",
          lesson_image: "https://play-lh.googleusercontent.com/A0U6IXd2dVpS3j0K5PWHk3hY9O0J1CC8zB2ZgAqX6RJYNw3ruRJj96tyrHGFW-DZIsQ",
          category: "f0bc01b1-b014-4578-a72d-e6d8b82225d4",
          sections: [
            {
              id: "662912ad-e940-4d1d-b9d4-d4228a2cf82c",
              title: "Chapter 1",
              no: "1",
              preview: true,
              lesson: "2896859c-5921-48d9-b9ea-9264eb0b567b",
              contents: [],
            },
            {
              id: "fcec76e4-dbf4-4d88-925d-6de6493217c9",
              title: "Chapter 1",
              no: "1",
              preview: true,
              lesson: "2896859c-5921-48d9-b9ea-9264eb0b567b",
              contents: [
                {
                  id: "487ef317-e0fc-409b-ae19-91a9bf148d7d",
                  title: "Introduction to Lesson",
                  no: "1.1",
                  preview: true,
                  file: "https://drive.google.com/file/d/0BwIk698yFF0ldk5Kc0ktYnBqT2s/view?resourcekey=0-6qk-C8R_DoNONJpNyfOWaw",
                  video_url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
                  video_title: "How to make a website",
                  section: "fcec76e4-dbf4-4d88-925d-6de6493217c9",
                },
                {
                  id: "9b4adeeb-52e4-4b32-a139-7533915b2d03",
                  title: "Introduction to Lesson",
                  no: "1.1",
                  preview: true,
                  file: "https://drive.google.com/file/d/0BwIk698yFF0ldk5Kc0ktYnBqT2s/view?resourcekey=0-6qk-C8R_DoNONJpNyfOWaw",
                  video_url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
                  video_title: "How to make a website",
                  section: "fcec76e4-dbf4-4d88-925d-6de6493217c9",
                },
              ],
            },
          ],
        },
        // other lessons...
      ],
    },
    // other categories...
  ],
  created_by: "pisalsek",
};

const CourseSteps = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleNext = () => {
    const currentCategory = courseData.categories[currentCategoryIndex];
    const currentLesson = currentCategory.lessons[currentLessonIndex];
    const currentSection = currentLesson.sections[currentSectionIndex];

    if (currentSectionIndex < currentLesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else if (currentLessonIndex < currentCategory.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentSectionIndex(0);
    } else if (currentCategoryIndex < courseData.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentLessonIndex(0);
      setCurrentSectionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentSectionIndex(courseData.categories[currentCategoryIndex].lessons[currentLessonIndex - 1].sections.length - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const previousCategory = courseData.categories[currentCategoryIndex - 1];
      setCurrentLessonIndex(previousCategory.lessons.length - 1);
      setCurrentSectionIndex(previousCategory.lessons[previousCategory.lessons.length - 1].sections.length - 1);
    }
  };

  const currentCategory = courseData.categories[currentCategoryIndex];
  const currentLesson = currentCategory.lessons[currentLessonIndex];
  const currentSection = currentLesson.sections[currentSectionIndex];

  return (
    <div>
      <h1>{courseData.course_name}</h1>
      <img src={courseData.course_thumbnail} alt={courseData.course_name} />
      <p>{courseData.course_description}</p>

      <h2>{currentCategory.category_name}</h2>
      <p>{currentCategory.category_description}</p>

      <h3>{currentLesson.lesson_title}</h3>
      <img src={currentLesson.lesson_image} alt={currentLesson.lesson_title} />

      <h4>{currentSection.title}</h4>
      <p>Preview: {currentSection.preview ? "Yes" : "No"}</p>

      {currentSection.contents.map((content) => (
        <div key={content.id}>
          <h5>{content.title}</h5>
          <p>No: {content.no}</p>
          <p>Preview: {content.preview ? "Yes" : "No"}</p>
          {content.file && <a href={content.file}>File</a>}
          {content.video_url && (
            <div>
              <p>Video: <a href={content.video_url}>{content.video_title}</a></p>
              <iframe src={content.video_url} title={content.video_title} width="560" height="315"></iframe>
            </div>
          )}
        </div>
      ))}

      <button onClick={handlePrevious} disabled={currentCategoryIndex === 0 && currentLessonIndex === 0 && currentSectionIndex === 0}>
        Previous
      </button>
      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default CourseSteps;
