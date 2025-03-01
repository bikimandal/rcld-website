import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import CourseDetails from "@/components/CourseDetails";

export default function CoursePage() {
  const router = useRouter();
  const { topic } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) return;

    fetch("/api/rcld-courses/supabase.courses")
      .then((res) => res.json())
      .then((courses) => {
        const selectedCourse = courses.find((c) => c.abbreviation === topic);
        setCourse(selectedCourse || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, [topic]);

  return (
    <>
      <NavBar />
      {loading ? (
        <p className="text-center py-20 text-lg">Loading...</p>
      ) : (
        <CourseDetails course={course} />
      )}
    </>
  );
}
