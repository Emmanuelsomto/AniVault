import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
      className="text-white flex flex-col justify-center items-center mb-10 mx-6"
    >
      <h2 className="font-bold text-2xl md:text-4xl mb-6 font-poppins">
        Ani<span className=" text-red-500">V</span>ault
      </h2>
      <p className="font-syne mb-10 tracking-wide font-normal mx-6 text-sm md:text-lg md:font-medium text-gray-400 text-center active:not-only:text-gray-100">
        A fast, distraction-free anime discovery engine built for fans.
      </p>

      <div className="flex flex-col justify-center items-center mx-6">
        <section className="flex flex-row gap-8 mb-8">
          <a
            href="https://x.com/Web3Wanderer9"
            target="_blank"
            className="text-gray-300 cursor-pointer hover:text-gray-200 active:not-only:text-gray-100"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/Emmanuelsomto"
            target="_blank"
            className="text-gray-300 cursor-pointer hover:text-gray-200 active:not-only:text-gray-100"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/emmanuel-agbai-867aa9364/"
            target="_blank"
            className="text-gray-300 cursor-pointer hover:text-gray-200"
          >
            <FaLinkedinIn className="w-6 h-6" />
          </a>
        </section>

        <p className="text-center font-normal font-syne text-sm md:text-base text-gray-200 tracking-tight md:tracking-wider">
          &copy;{new Date().getFullYear()} AniVault. Built with React &
          TailWindCSS.
        </p>
      </div>
    </motion.footer>
  );
}
