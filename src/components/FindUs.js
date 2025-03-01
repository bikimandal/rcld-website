import React, { useEffect, useState, useRef } from "react";
import SectionHeading from "./SectionHeading";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function FindUs() {
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetch("/api/socialmedia/supabase.socialmedia")
        .then((response) => response.json())
        .then((data) => {
          setPhone(
            data.find((item) => item.type === "phone")?.link || "Not Available"
          );
          setEmail(
            data.find((item) => item.type === "email")?.link || "Not Available"
          );
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeading
          blackText="Find"
          coloredText="Us"
          color="text-yellow-400"
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full rounded-xl p-6 shadow-lg">
          {/* Google Maps Embed - Left */}
          <div className="md:col-span-2 rounded-xl overflow-hidden shadow-md min-h-[18rem]">
            <iframe
              className="w-full h-full border-0 rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.2289321885232!2d88.1799041759777!3d26.25423238807723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4fd0023cbfdd1%3A0xa06deafb1fff087d!2sRCLD%20Computer%20Centre!5e0!3m2!1sen!2sin!4v1740306209388!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              title="RCLD Computer Centre Location"
            ></iframe>
          </div>

          {/* Address & Contact Info - Right */}
          <div className="bg-white/30 backdrop-blur-md rounded-l-xl shadow-lg border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-stretch justify-between gap-6">
            {/* Address - Left */}
            <div className="text-left flex-1">
              <h3 className="text-2xl font-semibold pb-3">Our Location</h3>
              <p className="text-gray-700 flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <span>
                  RCLD Campus <br />
                  Deshbandhu Para, Islampur <br />
                  Uttar Dinajpur, West Bengal <br />
                  India - 733202
                </span>
              </p>

              {/* Phone with Skeleton Loader */}
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaPhoneAlt className="text-green-500" />
                <strong>Phone:</strong>
                {phone === null ? (
                  <span className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></span>
                ) : (
                  phone
                )}
              </p>

              {/* Email with Skeleton Loader */}
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaEnvelope className="text-blue-500" />
                <strong>Email:</strong>
                {email === null ? (
                  <span className="w-36 h-4 bg-gray-300 animate-pulse rounded-md"></span>
                ) : (
                  email
                )}
              </p>
            </div>

            {/* QR Code (Uncomment if needed) */}
            {/* <div className="flex justify-center items-center flex-shrink-0">
              <img
                src="/images/qr/locationmapsqr.jpg"
                alt="Google Maps QR Code"
                className="w-[9rem] sm:w-[11rem] md:w-[13rem] lg:w-[15rem] h-auto rounded-lg shadow-md border border-gray-300"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
