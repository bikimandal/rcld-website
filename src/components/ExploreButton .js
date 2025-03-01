import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Spinner1 from "@/components/spinners/Spinner1"; // Make sure you have this spinner component

const ExploreButton = ({ text, route }) => {
  const [isExploreRouteLoading, setIsExploreRouteLoading] = useState(false);

  const handleExploreButtonClicked = () => {
    setIsExploreRouteLoading(true);
  };

  return (
    <div className="flex justify-center">
      <Link href={route}>
        <button
          className="mt-10 px-8 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-full shadow-lg hover:scale-103 hover:shadow-2xl transition duration-300 cursor-pointer group"
          onClick={handleExploreButtonClicked}
        >
          {text}
          <span className="transition-transform duration-300 group-hover:rotate-90">
            {isExploreRouteLoading ? (
              <Spinner1 color="#000000" size={25} />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default ExploreButton;
