import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import InfoModal from "./InfoModal";
import { Github } from "lucide-react";

const links = ["How It Works", "About", "Extension"];

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
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-8 py-6 bg-transparent relative z-20"
      >
        <h1 className={`text-xl font-semibold ${dark ? "text-white" : "text-black"}`}>
          FND
        </h1>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full 
          backdrop-blur-xl 
          bg-white/40 dark:bg-black/40 
          border border-white/30 dark:border-white/10
          shadow-lg"
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all
                ${
                  active === link
                    ? "bg-white/60 dark:bg-white/20 text-black dark:text-white shadow"
                    : "text-black/70 dark:text-white/70 hover:bg-white/40 dark:hover:bg-white/10"
                }
              `}
            >
              {link}
            </button>
          ))}

          <div className="w-px h-5 bg-black/20 dark:bg-white/20 mx-1" />

          {/* GitHub */}
          <a
            href="https://github.com/ANASXOP/fnd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full 
              bg-white/60 dark:bg-white/20 
              text-black dark:text-white 
              shadow hover:scale-105 transition-all"
          >
            <Github size={16} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-1.5 rounded-full text-sm 
              bg-white/60 dark:bg-white/20 
              text-black dark:text-white 
              shadow hover:scale-105 transition-all"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </motion.nav>

      {/* How It Works Modal */}
      <InfoModal
        open={openModal === "How It Works"}
        onClose={() => setOpenModal(null)}
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

      {/* About Modal */}
      <InfoModal
        open={openModal === "About"}
        onClose={() => setOpenModal(null)}
        title="About"
      >
        The Fake News Detection System is a final-year BCA project that focuses on the practical use of Artificial Intelligence, Natural Language Processing (NLP), and Machine Learning to address the growing problem of misinformation. The project is designed to demonstrate how modern AI techniques can be applied to real-world challenges through an accessible and interactive platform.        
        <br /><br />
        The system analyzes news content using NLP-based machine learning models and supports the analysis with advanced AI reasoning for better accuracy in complex cases. Along with strong technical foundations, the project also emphasizes modern UI/UX design, ensuring a smooth and user-friendly experience.
        <br /><br />
        Overall, this project highlights the complete journey from model training and backend development to frontend integration and deployment, showcasing how intelligent systems can help users verify information and make informed decisions in the digital age.
      </InfoModal>

{/* Extension Modal */}
<InfoModal
  open={openModal === "Extension"}
  onClose={() => setOpenModal(null)}
  title="FND Browser Extension"
>
  <p className="mb-4">
    Verify news instantly while browsing the web. No copy-paste. No switching tabs.
  </p>

  <div className="grid grid-cols-2 gap-4 mb-6">
    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">
      ⚡ One-click scan
    </div>
    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">
      🔍 Highlights fake claims
    </div>
    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">
      📊 Credibility score
    </div>
    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/10">
      🧠 NLP-powered
    </div>
  </div>

  <h3 className="font-semibold mb-2">How it works</h3>

  <ol className="list-decimal ml-4 space-y-2 mb-6">
    <li>Open any news article</li>
    <li>Click the FND extension</li>
    <li>Instant AI analysis</li>
    <li>See if it’s real or fake</li>
  </ol>

  <div className="flex gap-3">
    <button
      onClick={() =>
        window.open("https://github.com/ANASXOP/fnd-extension/releases/tag/v1.0", "_blank")
      }
      className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
    >
      Download Extension
    </button>
  </div>

  <p className="text-xs mt-4 opacity-60">
    Works on any Browser · Manual install
  </p>
</InfoModal>


    </>
  );
}
