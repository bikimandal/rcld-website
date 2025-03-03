import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiUser, FiLock } from "react-icons/fi";
import NavBar from "@/components/NavBar";
import Spinner1 from "@/components/spinners/Spinner1";
import { toast } from "react-toastify";
import { saveSessionKey, getSessionKey } from "../../../lib/IndexedDb";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSessionKey();
        const session = data ? JSON.parse(data) : null;
        if (session?.isLoggedIn) router.replace("/admin/dashboard");
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password.");
      toast.error("Missing credentials!", {
        theme: "dark",
        autoClose: 4000,
        pauseOnHover: false,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (res.ok && data.session?.access_token) {
        await saveSessionKey(
          JSON.stringify({
            isLoggedIn: true,
            user: data.user,
            token: data.session.access_token,
          })
        );
        toast.success("Login successful! Redirecting...", {
          theme: "dark",
          autoClose: 2000,
          pauseOnHover: false,
        });
        setTimeout(() => router.push("/admin/dashboard"), 500);
      } else {
        setError(data.error || "Login failed");
        toast.error(data.error || "Invalid credentials!", {
          theme: "dark",
          autoClose: 4000,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Network error! Please check your connection.", {
        theme: "dark",
        autoClose: 4000,
        pauseOnHover: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="w-full max-w-md p-9 bg-gray-950 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {[
              {
                name: "email",
                type: "email",
                icon: <FiUser />,
                placeholder: "Email",
              },
              {
                name: "password",
                type: "password",
                icon: <FiLock />,
                placeholder: "Password",
              },
            ].map(({ name, type, icon, placeholder }) => (
              <div key={name} className="relative">
                {icon && (
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                    {icon}
                  </span>
                )}
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={credentials[name]}
                  onChange={handleChange}
                  className="w-full px-12 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            ))}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="flex justify-center items-center w-full min-h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all rounded-lg font-semibold shadow-md transform hover:scale-[1.02] text-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? <Spinner1 color="#ffffff" size={50} /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
