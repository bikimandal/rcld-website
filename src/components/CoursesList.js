import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeading from "./SectionHeading";
import ExploreButton from "./ExploreButton ";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isExploreRouteLoading, setisExploreRouteLoading] = useState(false);

  useEffect(() => {
    fetch("/api/rcld-courses/supabase.courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.sort((a, b) => a.id - b.id).slice(0, 3)); // Sort by ID and then take the first 3
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setisExploreRouteLoading(false);
  }, []);

  const handleExploreButtonClicked = () => {
    setisExploreRouteLoading(true);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-purple-500 to-blue-500 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      <div className="max-w-6xl mx-auto text-center">
        <div>
          <SectionHeading
            blackText="Explore our"
            coloredText="RCLD Courses"
            color="text-yellow-400"
          />

          <p className="text-lg text-gray-200 mb-10">
            Upgrade your skills with our carefully crafted courses, designed for
            beginners and experts alike.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-xl overflow-hidden border-4 border-transparent animate-pulse"
                  >
                    {/* Placeholder for the image section */}
                    <div className="w-full h-48 bg-gray-300"></div>

                    {/* Placeholder for content */}
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>

                      {/* Placeholder for subject tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                        <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                        <div className="h-6 bg-gray-300 rounded-full w-12"></div>
                      </div>
                    </div>
                  </div>
                ))
              : courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() =>
                      router.push(`/rcld-courses/${course.abbreviation}`)
                    }
                    className="bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-103 border-4 border-transparent hover:border-purple-400 cursor-pointer"
                  >
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-t from-amber-500 to-gray-800 text-white text-5xl font-bold uppercase">
                      {course.abbreviation}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {course.title}
                      </h3>

                      {/* Subjects List */}
                      {course.subjects && course.subjects.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Things Covered:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.subjects.map((subject, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 text-sm font-medium rounded-full shadow-sm 
                          ${
                            index % 2 === 0
                              ? "bg-amber-500 text-gray-800"
                              : "bg-gray-800 text-white"
                          }`}
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <ExploreButton text="Explore All Courses" route="/rcld-courses" />
      </div>
    </section>
  );
};

export default CoursesList;
