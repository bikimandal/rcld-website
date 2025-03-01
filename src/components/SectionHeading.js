export default function SectionHeading({
  blackText,
  coloredText,
  color,
  blackTextColor = "text-gray-950",
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight mulish-font ${blackTextColor}`}
    >
      {blackText} <span className={color}>{coloredText}</span>
    </h2>
  );
}
