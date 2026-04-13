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

  // ── Normalise result with safe fallbacks ──────────────────────────────────
  const rawLabel   = result?.label;
  const isFake     = rawLabel === "Fake";
  const isReal     = rawLabel === "Real";

  // Badge text — never empty
  const badgeLabel = isFake ? "Fake" : isReal ? "True" : "Uncertain";

  // Safe fallbacks for data fields
  const confidence  = result?.confidence != null && result?.confidence !== ""
                        ? result.confidence
                        : 0;
  const explanation = result?.explanation?.trim() || "Unable to verify at the moment.";

  // ── Theme — Uncertain uses muted slate (zero yellow anywhere on modal) ─────
  const theme = isFake
    ? {
        badgeBg    : "rgba(239,68,68,0.18)",
        badgeBorder: "rgba(239,68,68,0.45)",
        badgeText  : "#f87171",
        badgeShadow: "0 0 18px rgba(239,68,68,0.35)",
        barColor   : "#ef4444",
        barGlow    : "0 0 8px rgba(239,68,68,0.6)",
        accentText : "#f87171",
      }
    : isReal
    ? {
        badgeBg    : "rgba(34,197,94,0.18)",
        badgeBorder: "rgba(34,197,94,0.45)",
        badgeText  : "#4ade80",
        badgeShadow: "0 0 18px rgba(34,197,94,0.35)",
        barColor   : "#22c55e",
        barGlow    : "0 0 8px rgba(34,197,94,0.6)",
        accentText : "#4ade80",
      }
    : {
        // Uncertain — muted slate badge only, no glow, no coloured modal border
        badgeBg    : "rgba(148,163,184,0.15)",
        badgeBorder: "rgba(148,163,184,0.35)",
        badgeText  : "#94a3b8",
        badgeShadow: "none",
        barColor   : "#64748b",
        barGlow    : "none",
        accentText : "#94a3b8",
      };
  // ──────────────────────────────────────────────────────────────────────────

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

        {/* Modal — always the same subtle glass border, no colour tint */}
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

              {/* ── Verdict badge — always populated ── */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 14, stiffness: 200 }}
                  style={{
                    background : theme.badgeBg,
                    border     : `1px solid ${theme.badgeBorder}`,
                    color      : theme.badgeText,
                    boxShadow  : theme.badgeShadow,
                    transition : "background 0.4s ease, box-shadow 0.4s ease",
                  }}
                  className="px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide"
                >
                  {badgeLabel}
                </motion.span>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by Gemini AI
                </span>
              </div>

              {/* ── Confidence bar ── */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Confidence
                </p>

                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{
                      background: theme.barColor,
                      boxShadow : theme.barGlow,
                    }}
                    className="h-full rounded-full"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ color: theme.accentText }}
                  className="mt-2 text-sm font-semibold"
                >
                  {confidence}% sure
                </motion.p>
              </div>

              {/* ── Explanation ── */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Explanation
                </p>
                <p className="text-sm text-black dark:text-white leading-relaxed">
                  {explanation}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
