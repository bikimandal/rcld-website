import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function Partners() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-8 flex flex-col items-center mb-10">
      <SectionHeading
        blackText="Our"
        coloredText="Collaborative Partners"
        color="text-yellow-400"
      />
      <div className="flex justify-center items-center lg:gap-24 gap-8 md:gap-12">
        {/* Partner 1 */}
        <Image
          src="/images/partners/rcldlogo.png" // Update with actual path
          alt="Partner 1 Logo"
          width={150}
          height={150}
          className="h-auto w-32 md:w-40 lg:w-48 object-contain"
          priority
        />
        {/* Partner 2 */}
        <Image
          src="/images/partners/cyber-world.jpg" // Update with actual path
          alt="Partner 2 Logo"
          width={150}
          height={150}
          className="h-auto w-32 md:w-40 lg:w-48 object-contain"
          priority
        />
      </div>
    </section>
  );
}
