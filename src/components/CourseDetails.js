import React from "react";

const CourseDetails = ({ course }) => {
  if (!course) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Course not found.
      </div>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950 min-h-screen cursor-default">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-500">
        {/* Course Image or Abbreviation */}
        {course.abbreviation ? (
          <div className="w-full h-40 sm:h-52 px-5 flex items-center text-center justify-center bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-4xl sm:text-6xl font-extrabold uppercase tracking-wide">
            {course.abbreviation.replace(/-/g, " ")}
          </div>
        ) : (
          <div className="w-full h-40 sm:h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">
              No Image Available
            </span>
          </div>
        )}

        {/* Course Details */}
        <div className="p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            {course.title}
          </h2>
          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {course.description || "No description available."}
          </p>

          {/* Fees & Duration */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg sm:text-xl font-semibold">
            <p className="text-blue-600 dark:text-blue-400">
              💰 Fees: ₹{" "}
              <span className="font-bold text-blue-600">
                {course.fees ? course.fees : "N/A"}/-
              </span>
            </p>
            <p className="text-green-600 dark:text-green-400 mt-2 sm:mt-0">
              ⏳ Duration:{" "}
              <span className="font-abold text-green-600">
                {course.duration ? course.duration : "N/A"}
              </span>
            </p>
          </div>

          {/* Applications to Learn */}
          {course.applications && course.applications.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                📌 Applications You Will Learn:
              </h3>
              <ul className="list-disc pl-4 sm:pl-6 mt-3 text-gray-700 dark:text-gray-300 space-y-1">
                {course.applications.map((app, index) => (
                  <li key={index} className="text-md sm:text-lg">
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subjects Covered with Pills */}
          {course.subjects && course.subjects.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                📖 Subjects Covered:
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {course.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 text-sm sm:text-lg bg-blue-400 text-gray-800 rounded-full font-medium shadow-md"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                🎓 Prerequisites:
              </h3>
              <ul className="list-disc pl-4 sm:pl-6 mt-3 text-gray-700 dark:text-gray-300 space-y-1">
                {course.prerequisites.map((pre, index) => (
                  <li key={index} className="text-md sm:text-lg">
                    {pre}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Enroll Button */}
          <button
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-600 text-white py-3 rounded-lg font-semibold text-lg sm:text-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-101 cursor-pointer"
            onClick={() =>
              window.open("https://forms.gle/fuNnkVcNGeKSba9x6", "_blank")
            }
          >
            🚀 Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
