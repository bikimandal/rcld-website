import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          biki Us
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Fill out the form below to get in touch with us.
        </p>

        <div className="w-full max-w-4xl aspect-[4/3]">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdUI-wcsPZnGKzaGzwG_I2OZ5w5GPm3H7WYD7jD6DGyybs1eg/viewform?embedded=true"
            width="640"
            height="959"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            allowFullScreen
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
