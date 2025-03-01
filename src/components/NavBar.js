"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Spinner1 from "./spinners/Spinner1";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-toastify";
import { removeSessionKey, getSessionKey } from "../../lib/IndexedDb";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [adminSessionRaw, setAdminSessionRaw] = useState(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/", dropdown: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Query", href: "/query", dropdown: true },
    { name: "Admin", href: "/admin" },
  ];

  const queryOptions = [
    { name: "Contact", href: "/contact" },
    {
      name: "Verify Registration",
      href: "https://www.rcldgov.in/RCLD/Queries/Registration%20Verification",
    },
  ];

  const galleryOptions = [
    { name: "RCLD Courses", href: "/rcld-courses" },
    { name: "Personalised Courses", href: "/personalised-courses" },
  ];

  // useEffect(() => {
  //   const adminSession = localStorage.getItem("SessionData");
  //   if (adminSession) {
  //     const parsedSession = JSON.parse(adminSession);
  //     setIsAdminLoggedIn(parsedSession.isLoggedIn);
  //   }
  // }, []);

  // useEffect(() => {
  //   async function fetchAdminSession() {
  //     try {
  //       const data = await getSessionKey(); // Fetch session data
  //       if (!data) return; // Prevent errors if data is null

  //       const parsedSession = JSON.parse(data); // Parse JSON
  //       console.log("Admin Session:", parsedSession);
  //       // setIsAdminLoggedIn(parsedSession?.isLoggedIn || false); // ✅ Set state safely

  //     } catch (error) {
  //       console.error("Error fetching session:", error);
  //     }
  //   }

  //   fetchAdminSession();
  // }, []);

  useEffect(() => {
    async function fetchSession() {
      try {
        const data = await getSessionKey(); // Fetch session data
        if (!data) return; // Prevent errors if data is null

        setAdminSessionRaw(data); // ✅ Store session as a raw string
        const parsedSession = JSON.parse(data);
        setIsAdminLoggedIn(parsedSession?.isLoggedIn || false); // ✅ Set state safely
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }

    fetchSession();
  }, []);

  // const handleLogout = async () => {
  //   setIsLogoutLoading(true);

  //   const logoutPromise = new Promise(async (resolve, reject) => {
  //     try {
  //       // Retrieve session data from localStorage
  //       const adminSession = localStorage.getItem("SessionData");

  //       if (!adminSession) {
  //         setIsLogoutLoading(false);
  //         reject("No active session found. You are not logged in.");
  //         return;
  //       }

  //       // Parse the session data to extract the access token
  //       const session = JSON.parse(adminSession);
  //       const token = session.access_token;

  //       const response = await fetch("/api/auth/logout", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.ok) {
  //         // Clear stored session data
  //         localStorage.removeItem("SessionData");
  //         setIsAdminLoggedIn(false);

  //         // Log out the user from Supabase client-side
  //         await supabase.auth.signOut();

  //         resolve("Successfully logged out. Redirecting...");

  //         setTimeout(() => {
  //           window.location.href = "/"; // Redirect after toast
  //         }, 2000);
  //       } else {
  //         reject("Logout failed. Please try again.");
  //       }
  //     } catch (error) {
  //       reject("Error logging out. Check your connection.");
  //     } finally {
  //       setIsLogoutLoading(false);
  //     }
  //   });

  //   // Display toast notifications
  //   toast.promise(logoutPromise, {
  //     pending: {
  //       render: "Logging out...",
  //       theme: "dark",
  //     },
  //     success: {
  //       render({ data }) {
  //         return data;
  //       },
  //       theme: "dark",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //     },
  //     error: {
  //       render({ data }) {
  //         return data;
  //       },
  //       theme: "dark",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //     },
  //   });
  // };

  const handleLogout = async () => {
    setIsLogoutLoading(true);

    try {
      const adminSession = adminSessionRaw;

      if (!adminSession) {
        toast.error("Session expired. Please log in again.", {
          theme: "dark",
          autoClose: 4000,
        });
        setIsLogoutLoading(false);
        return;
      }

      const session = JSON.parse(adminSession);
      if (!session.token) {
        toast.error("Invalid session data. Please log in again.", {
          theme: "dark",
          autoClose: 4000,
        });
        setIsLogoutLoading(false);
        return;
      }

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Logout error response:", errorData); // ✅ Debug
        throw new Error("Logout failed. Please try again.");
      }

      await removeSessionKey();
      localStorage.setItem("hasVisitedDashboard", "false");
      // localStorage.removeItem("SessionData");
      setIsAdminLoggedIn(false);
      await supabase.auth.signOut();

      toast.success("Successfully logged out!", {
        theme: "dark",
        autoClose: 2000,
      });
      router.push("/");
    } catch (error) {
      toast.error(
        error.message || "Error logging out. Check your connection.",
        { theme: "dark", autoClose: 4000 }
      );
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg text-white py-4 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-cente overflow-hiddenr">
        <div className="text-2xl gap-5 font-extrabold tracking-wide text-white drop-shadow-md flex">
          <img
            src="/images/partners/cyber-world-removedbg.png"
            alt="Partner Logo"
            className="w-10 h-auto object-contain"
          />

          <Link href="/">RCLD Islampur</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button className="flex items-center text-lg font-medium text-gray-300 hover:text-cyan-400 transition-all cursor-pointer">
                    {link.name}
                    <ChevronDown
                      size={18}
                      className="ml-1 transition-transform group-hover:rotate-180"
                    />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-gray-900/90 text-white shadow-xl rounded-lg backdrop-blur-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {(link.name === "Courses"
                      ? galleryOptions
                      : queryOptions
                    ).map((option) => (
                      <Link
                        key={option.name}
                        href={option.href}
                        target={
                          option.name === "Verify Registration" ? "_blank" : ""
                        }
                        className="block px-4 py-2 text-md font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all"
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`relative text-lg font-medium transition-all group ${
                    pathname === link.href ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          ))}

          {isAdminLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-[100px] h-[40px] flex justify-center items-center text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-bold cursor-pointer relative"
            >
              {!isLogoutLoading && <span>Logout</span>}
              {isLogoutLoading && (
                <div className="absolute">
                  <Spinner1 color="#ffffff" size={40} />
                </div>
              )}
            </button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 text-white shadow-lg rounded-b-lg">
          {links.map((link) => (
            <div key={link.name} className="border-b border-gray-800">
              {link.dropdown ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-300 hover:text-cyan-400 transition-all"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.name ? null : link.name
                      )
                    }
                  >
                    {link.name}
                    <ChevronDown
                      size={18}
                      className={`ml-1 transition-transform ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.name && (
                    <div className="bg-gray-800">
                      {(link.name === "Courses"
                        ? galleryOptions
                        : queryOptions
                      ).map((option) => (
                        <Link
                          key={option.name}
                          href={option.href}
                          target={
                            option.name === "Verify Registration"
                              ? "_blank"
                              : ""
                          }
                          className="block px-6 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          {option.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block px-6 py-4 text-lg font-medium text-gray-300 hover:text-cyan-400 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          {/* Logout Button in Mobile Menu */}
          {isAdminLoggedIn && (
            <div className="px-6 py-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full h-[40px] flex justify-center items-center text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-bold cursor-pointer relative"
              >
                {!isLogoutLoading && <span>Logout</span>}
                {isLogoutLoading && (
                  <div className="absolute">
                    <Spinner1 color="#ffffff" size={40} />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
