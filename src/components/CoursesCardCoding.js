import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CoursesCardCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition transform duration-300 hover:shadow-2xl border-4 border-transparent hover:border-slate-700 hover:bg-gradient-to-b from-gray-100 to-white flex flex-col">
      {/* Course Abbreviation as a Placeholder for Image */}
      <div className="relative h-56 flex items-center justify-center bg-gradient-to-b from-amber-500 to-gray-800 cursor-default">
        <span className="text-white text-3xl text-center font-extrabold uppercase inset-0 hover:scale-150 transition transform duration-300">
          {course.abbreviation.replace(/-/g, " ")}
        </span>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 cursor-default">
          {course.title}
        </h3>

        {/* Topics Section */}
        {course.subjects && course.subjects.length > 0 && (
          <div className="mt-4 flex-grow">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Key Topics:
            </h4>
            <div className="flex flex-wrap gap-2 max-h-50 overflow-y-auto">
              {course.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full shadow-md transition-transform duration-300 cursor-default"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Learn More Button */}
        <div className="mt-auto">
          <Link href={`/personalised-courses/${course.abbreviation}`}>
            <button className="w-full py-2 my-5 flex items-center justify-center gap-2 bg-amber-500/80 text-gray-800 font-semibold rounded-lg shadow-md hover:scale-95 hover:shadow-xl transition duration-300 cursor-pointer group">
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesCardCard;
