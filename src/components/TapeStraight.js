import React from "react";

const messages = [
  "📢 Admissions Open - Enroll Now!",
  "💻 Learn AI & Web Development Today!",
  "🚀 Upgrade Your Skills with Our Courses!",
  "🎓 New Batch Starting Soon!",
];

export default function TapeStraight() {
  return (
    <div className="absolute m-0 p-0 w-full overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 z-1">
      {/* First copy of the messages */}
      <div className="animate-scroll flex whitespace-nowrap py-3">
        {messages.map((message, idx) => (
          <div
            key={`${message}-${idx}`}
            className="flex-none inline-flex items-center px-4"
          >
            <span className="text-white text-lg font-medium tracking-wide">
              {message}
            </span>
            <span className="text-gray-300 mx-4">•</span>
          </div>
        ))}

        {/* Second copy for seamless loop */}
        {messages.map((message, idx) => (
          <div
            key={`${message}-second-${idx}`}
            className="flex-none inline-flex items-center px-4"
          >
            <span className="text-white text-lg font-medium tracking-wide">
              {message}
            </span>
            <span className="text-gray-300 mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
