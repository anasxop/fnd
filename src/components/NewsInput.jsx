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
      const res = await axios.post("http://127.0.0.1:8000/predict", { text });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      setResult({ final_verdict: "Error", confidence: 0, explanation: "Failed to connect to server." });
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 w-full max-w-2xl rounded-2xl p-5
                   bg-black/40 backdrop-blur-xl
                   border border-white/10
                   shadow-lg"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news article or claim here..."
          className="w-full h-40 resize-none bg-transparent outline-none border-none
                     text-white/85 placeholder:text-white/25
                     text-sm leading-relaxed"
        />

        {/* hairline separator — matches navbar internal divider style */}
        <div className="w-full h-px bg-white/8 mb-4" />

        <motion.button
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.97 } : {}}
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all
            ${loading
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-white/90 text-black/85 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
            }`}
        >
          {loading ? "Analyzing…" : "Analyze News"}
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
