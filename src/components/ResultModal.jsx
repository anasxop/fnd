import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultModal({ open, onClose, loading, result }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const verdictColor =
    result?.final_verdict === "Fake"
      ? "bg-red-500/20 text-red-600 dark:text-red-400"
      : result?.final_verdict === "Real"
      ? "bg-green-500/20 text-green-600 dark:text-green-400"
      : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative z-10 w-full max-w-lg mx-4 rounded-2xl p-6 
                     bg-white/90 dark:bg-white/5 backdrop-blur-xl 
                     border border-black/10 dark:border-white/10 shadow-2xl"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Analyzing with AI...
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Verification Result
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Final Verdict */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${verdictColor}`}
                >
                  {result?.final_verdict}
                </span>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Primary: Gemini AI
                </span>
              </div>

              {/* Confidence */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Confidence
                </p>
                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result?.confidence || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${
                      result?.final_verdict === "Fake"
                        ? "bg-red-500"
                        : result?.final_verdict === "Real"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {result?.confidence}% sure
                </p>
              </div>

              {/* Explanation */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Explanation
                </p>
                <p className="text-sm text-black dark:text-white leading-relaxed">
                  {result?.explanation}
                </p>
              </div>

              {/* ML Secondary */}
              <div className="mt-6 border-t border-black/10 dark:border-white/10 pt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Secondary AI model (reference only)
                </p>
                <p className="text-sm text-black dark:text-white">
                  Prediction: <strong>{result?.ml_result}</strong>
                </p>
                <p className="text-sm text-black dark:text-white">
                  Confidence: <strong>{result?.ml_confidence}%</strong>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
