import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaInstagram,
} from "react-icons/fa";

const iconMapping = {
  Facebook: FaFacebookF,
  WhatsApp: FaWhatsapp,
  Instagram: FaInstagram,
  Mail: FaEnvelope,
  Phone: FaPhone,
};

const quickLinks = [
  { name: "Home", value: "/" },
  { name: "Rcld Courses", value: "/rcld-courses" },
  { name: "Personalised Courses", value: "/personalised-courses" },
  {
    name: "Verify registration",
    url: "https://www.rcldgov.in/RCLD/Queries/Registration%20Verification",
  },
];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/socialmedia/supabase.socialmedia")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          href:
            item.type === "phone"
              ? `tel:${item.link}`
              : item.type === "email"
              ? `mailto:${item.link}`
              : item.link,
          Icon: iconMapping[item.name] || FaFacebookF,
        }));

        setSocialLinks(formattedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Contact Info (Dynamic) */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            Contact Us
          </h3>
          {loading ? (
            <>
              <p className="bg-gray-700 h-4 w-40 rounded animate-pulse mb-3"></p>
              <p className="bg-gray-700 h-4 w-32 rounded animate-pulse mb-3"></p>
            </>
          ) : (
            socialLinks
              .filter((item) => item.type === "email" || item.type === "phone")
              .map((contact) => (
                <p key={contact.id} className="text-gray-400">
                  <a
                    href={contact.href}
                    className="hover:text-cyan-400 flex items-center gap-2"
                  >
                    <contact.Icon /> {contact.link}
                  </a>
                </p>
              ))
          )}
        </div>
        {/* Quick Links */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index} className="break-words">
                <a
                  href={link.url || link.value}
                  className="hover:text-cyan-400 truncate"
                  target={link.url ? "_blank" : "_self"}
                  rel={link.url ? "noopener noreferrer" : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media (Dynamic) */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            {loading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 bg-gray-700 rounded-full animate-pulse"
                  ></div>
                ))
              : socialLinks
                  .filter((item) => item.type === "social")
                  .map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      className="hover:text-cyan-400 transition-all duration-300 text-xl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.Icon />
                    </a>
                  ))}
          </div>
        </div>
        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            Subscribe
          </h3>
          <p className="text-gray-400 mb-4">Get the latest updates & offers.</p>
          <div className="flex flex-col sm:flex-row items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64 px-4 py-3 rounded-l-lg sm:rounded-l-lg border-none ring-1 ring-cyan-400 outline-none text-amber-50 mb-3 sm:mb-0"
            />
            <button className="bg-cyan-400 text-gray-900 px-6 py-3 outline-cyan-400 outline-1 rounded-r-lg sm:rounded-r-lg font-bold hover:bg-cyan-500 transition-all duration-300 cursor-pointer w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
