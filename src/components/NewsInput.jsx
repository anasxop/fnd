import { useState } from "react";
import { motion } from "framer-motion";
import ResultModal from "./ResultModal";
import axios from "axios";

export default function NewsInput() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

const handleAnalyze = async () => {
  if (!text.trim() || loading) return;

  setOpen(true);
  setLoading(true);
  setResult(null);

  try {
    const res = await axios.post("https://fnd-backend.vercel.app", {
  text: text,
});

    setResult(res.data);
  } catch (error) {
    console.error(error);
    setResult({
      final_verdict: "Error",
      confidence: 0,
      explanation: "Failed to connect to server.",
    });
  }

  setLoading(false);
};


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 w-full max-w-2xl rounded-2xl p-6 backdrop-blur-xl shadow-xl
                   bg-white/40 dark:bg-black/40"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news article or claim here..."
          className="w-full h-40 resize-none bg-transparent outline-none
                     text-black dark:text-white
                     placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

        <motion.button
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.97 } : {}}
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-xl font-medium transition
            ${
              loading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-black text-white dark:bg-white dark:text-black"
            }
          `}
        >
          {loading ? "Analyzing..." : "Analyze News"}
        </motion.button>
      </motion.div>

      <ResultModal
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        result={result}
      />
    </>
  );
}
