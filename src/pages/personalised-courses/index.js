import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import CoursesCardCoding from "@/components/CoursesCardCoding";
import { PropagateLoader } from "react-spinners";
import Footer from "@/components/Footer";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/personalised-courses/supabase.courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <section className="py-20 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-lg">
              Explore Our
              <span className="text-blue-700"> Personalised Courses</span>
            </h2>

            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Upgrade your skills with our top-rated courses, carefully curated
              for you.
            </p>
          </div>

          {/* Loader while fetching data */}
          {loading ? (
            <div className="flex justify-center py-20">
              <PropagateLoader color="#2563eb" size={30} />
            </div>
          ) : (
            /* Course Grid */
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12">
              {courses.map((course) => (
                <CoursesCardCoding key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Courses;
