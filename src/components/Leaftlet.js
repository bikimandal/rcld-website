import Image from "next/image";

export default function Leaftlet() {
  return (
    <div className="w-full px-6 md:px-8 lg:px-52 py-10 flex flex-col md:flex-row justify-center items-center gap-12 pt-36">
      {/* First Image */}
      <div className="w-full h-auto md:w-1/2 flex justify-center">
        <Image
          src="/images/mainpageimages/leaflet-frontside.jpg"
          alt="Promotional Leaflet Front"
          width={1920}
          height={1080}
          className="w-full max-w-[800px] h-auto rounded-lg shadow-2xl"
          quality={85}
          priority
        />
      </div>

      {/* Second Image */}
      <div className="w-full h-auto md:w-1/2 flex justify-center">
        <Image
          src="/images/mainpageimages/leaflet-backside.png"
          alt="Promotional Leaflet Back"
          width={1920}
          height={1080}
          className="w-full max-w-[800px] h-auto rounded-lg shadow-2xl"
          quality={85}
          priority
        />
      </div>
    </div>
  );
}
