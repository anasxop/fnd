import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NewsInput from "./NewsInput";

export default function Hero() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className="flex flex-col items-center justify-center px-6 mt-24 text-center">
     <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
    dark
      ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
      : "text-black"
  }`}
>
  Fake News Detection System
</motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`mt-4 text-lg max-w-xl ${
          dark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Paste any news article or link and let AI verify its authenticity.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-gray-500"
      >
        Created by{" "}
        <span className="font-medium">Anas</span>,{" "}
        <span className="font-medium">Kaif</span> &{" "}
        <span className="font-medium">Sakshi</span>
      </motion.p>

      <NewsInput />
    </div>
  );
}
