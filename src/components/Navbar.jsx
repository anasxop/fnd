import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import InfoModal from "./InfoModal";
import { Github } from "lucide-react";

const links = ["How It Works", "About", "Extension"];

// Animated Light/Dark label — flips like a ticker on toggle
function AnimatedLabel({ dark }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={dark ? "light" : "dark"}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        className="block"
      >
        {dark ? "Light" : "Dark"}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const [active, setActive] = useState(null);
  const [openModal, setOpenModal] = useState(null);

  const handleNavClick = (link) => {
    setActive(link);
    setOpenModal(link);
  };

  return (
    <>
      {/* Slides down on load — same as original */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between px-8 py-6 bg-transparent relative z-20"
      >
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className={`text-xl font-semibold cursor-default select-none ${dark ? "text-white" : "text-black"}`}
        >
          FND
        </motion.h1>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full
            backdrop-blur-xl
            bg-white/40 dark:bg-black/40
            border border-white/30 dark:border-white/10
            shadow-lg"
        >
          {links.map((link, i) => (
            <motion.button
              key={link}
              onClick={() => handleNavClick(link)}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 relative
                ${
                  active === link
                    ? "bg-white/60 dark:bg-white/20 text-black dark:text-white shadow"
                    : "text-black/70 dark:text-white/70 hover:bg-white/40 dark:hover:bg-white/10"
                }`}
            >
              {link}
              {/* Sliding active indicator dot */}
              {active === link && (
                <motion.span
                  layoutId="activeNavDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black/50 dark:bg-white/50"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </motion.button>
          ))}

          <div className="w-px h-5 bg-black/20 dark:bg-white/20 mx-1" />

          {/* GitHub — slight wobble on hover */}
          <motion.a
            href="https://github.com/ANASXOP/fnd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.14, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="p-2 rounded-full
              bg-white/60 dark:bg-white/20
              text-black dark:text-white
              shadow"
          >
            <Github size={16} />
          </motion.a>

          {/* Theme toggle — text flips like a ticker */}
          <motion.button
            onClick={() => setDark(!dark)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-4 py-1.5 rounded-full text-sm overflow-hidden
              bg-white/60 dark:bg-white/20
              text-black dark:text-white
              shadow min-w-[52px] text-center"
          >
            <AnimatedLabel dark={dark} />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Modals — content identical to original ── */}
      <InfoModal
        open={openModal === "How It Works"}
        onClose={() => { setOpenModal(null); setActive(null); }}
        title="How It Works"
      >
        This system uses Natural Language Processing (NLP) and Machine Learning to analyze news articles and determine whether the information is likely to be real or fake. Instead of relying on simple keyword matching, it examines deeper language patterns such as sentence structure, word choice, tone, and writing style. These patterns often reveal whether content is factual, exaggerated, or intentionally misleading.
        <br /><br />
        The machine learning model is trained on a large collection of real and fake news articles. Through this training, the model learns how trustworthy news is typically written and how fake news often differs in phrasing, emotional language, and structure. When a user submits news text, the system applies the same learned patterns to generate a prediction.
        <br /><br />
        For news that is unclear or highly contextual, the system uses modern AI reasoning to better understand meaning and intent. This helps handle complex claims, incomplete information, or content that requires real-world context. The final result is presented in a simple format, along with confidence information and explanations where applicable.
        <br /><br />
        All processing happens quickly through a web-based interface. Users can paste news content, click analyze, and receive results within seconds. The purpose of this system is to reduce the spread of misinformation, support informed decision-making, and make news verification easy and accessible for everyone.
        <br /><br />
        Our goal is to reduce misinformation and help users verify content easily.
      </InfoModal>

      <InfoModal
        open={openModal === "About"}
        onClose={() => { setOpenModal(null); setActive(null); }}
        title="About"
      >
        The Fake News Detection System is a final-year BCA project that focuses on the practical use of Artificial Intelligence, Natural Language Processing (NLP), and Machine Learning to address the growing problem of misinformation. The project is designed to demonstrate how modern AI techniques can be applied to real-world challenges through an accessible and interactive platform.
        <br /><br />
        The system analyzes news content using NLP-based machine learning models and supports the analysis with advanced AI reasoning for better accuracy in complex cases. Along with strong technical foundations, the project also emphasizes modern UI/UX design, ensuring a smooth and user-friendly experience.
        <br /><br />
        Overall, this project highlights the complete journey from model training and backend development to frontend integration and deployment, showcasing how intelligent systems can help users verify information and make informed decisions in the digital age.
      </InfoModal>

      <InfoModal
        open={openModal === "Extension"}
        onClose={() => { setOpenModal(null); setActive(null); }}
        title="FND Browser Extension"
      >
        <p className="mb-4">Verify news instantly while browsing the web. No copy-paste. No switching tabs.</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">⚡ One-click scan</div>
          <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">🔍 Highlights fake claims</div>
          <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">📊 Credibility score</div>
          <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">🧠 NLP-powered</div>
        </div>
        <h3 className="font-semibold mb-2">How it works</h3>
        <ol className="list-decimal ml-4 space-y-2 mb-6">
          <li>Open any news article</li>
          <li>Click the FND extension</li>
          <li>Instant AI analysis</li>
          <li>See if it's real or fake</li>
        </ol>
        <div className="flex gap-3">
          <button
            onClick={() => window.open("https://github.com/ANASXOP/fnd-extension/releases/tag/v1.0", "_blank")}
            className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
          >
            Download Extension
          </button>
        </div>
        <p className="text-xs mt-4 opacity-60">Works on any Browser · Manual install</p>
      </InfoModal>
    </>
  );
}
