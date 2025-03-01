import { WaveBottom, Wave1 } from "@/components/svgs/svg";

const Description = () => {
  return (
    <section className="relative bg-gradient-to-br from-cyan-400 via-blue-200 to-gray-100 py-24 px-6 overflow-hidden">
      <WaveBottom
        fill="#ffffff"
        className="absolute w-full inset-0 rotate-0 bg-cyan-400"
      />

      <div className="max-w-4xl mx-auto text-center backdrop-blur-lg bg-white/30 shadow-xl p-10 rounded-2xl border border-white/50">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
          Welcome to <span className="text-cyan-600">RCLD Islampur</span>
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          At our computer center, we provide industry-relevant courses in
          programming, web development, graphic design, and IT management.
        </p>
      </div>
    </section>
  );
};

export default Description;
