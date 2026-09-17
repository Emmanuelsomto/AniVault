import form from "../assets/Form.jpg";
import { useState } from "react";
import { FaPaperPlane, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Logging in with:", formData);

    setTimeout(() => {
      setLoading(false);
      alert(`Welcome back to AniVault, ${formData.name || "user"}!`);
    }, 1200);
  };
  return (
    <div className="text-white mt-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="flex flex-col justify-center items-center text-center gap-6 md:mb-24"
      >
        <h1 className="text-2xl md:text-5xl font-poppins font-bold tracking-wide">
          Ani<span className="text-red-500">V</span>ault
        </h1>
        <p className="tracking-wide leading-relaxed font-syne font-medium text-sm md:text-lg text-slate-400">
          Welcome back! Access your collection.
        </p>
      </motion.div>

      <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 mb-24 mx-8">
        <div className="w-full h-full hidden md:block relative">
          <img
            src={form}
            alt="Totoro"
            loading="lazy"
            width={500}
            height={500}
            className="object-cover overflow-hidden w-full h-full rounded-lg"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="flex flex-col gap-2 border border-slate-900 bg-slate-900 px-8 py-16 rounded-lg w-full h-full"
        >
          <label
            htmlFor="name"
            className="text-white font-poppins text-lg mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="John Doe"
            className="border border-slate-700 px-2 py-2.5 w-full rounded-lg bg-slate-900 text-slate-100 placeholder:text-slate-600 font-poppins mb-4 focus:outline-red-700 focus:outline focus:ring-2 focus:ring-red-700"
          />

          <label
            htmlFor="email"
            className="text-white font-poppins text-lg mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            className="border border-slate-700 px-2 py-2.5 w-full rounded-lg bg-slate-900 text-slate-100 placeholder:text-slate-600 font-poppins mb-4 focus:outline-red-700 focus:outline focus:ring-2 focus:ring-red-700"
          />

          <label
            htmlFor="password"
            className="text-white font-poppins text-lg mb-1"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="*******"
              className="border border-slate-700 px-2 py-2.5 w-full rounded-lg bg-slate-900 text-slate-100 placeholder:text-slate-600 font-poppins mb-8 focus:outline-red-700 focus:outline focus:ring-2 focus:ring-red-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex gap-2.5 justify-center items-center text-white border border-red-500 bg-red-700 rounded-lg w-full h-full px-2 py-2.5 font-poppins cursor-pointer text-lg md:text-xl hover:bg-red-800 active:bg-red-700 transition-colors ease-in duration-200"
          >
            <span>{loading ? "Signing In..." : "Login"}</span>
            <span>
              <FaPaperPlane />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
