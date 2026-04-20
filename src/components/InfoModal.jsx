import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoModal({ open, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.58)", backdropFilter: "blur(18px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              margin: "0 16px",
              borderRadius: "20px",
              /* Matches navbar exactly */
              background: "rgba(0,0,0,0.40)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              maxHeight: "80vh",
            }}
          >
            {/* Header — no white bar, just a faint separator */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 22px 16px",
              flexShrink: 0,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <h2 style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600, fontSize: "16px", letterSpacing: "-0.015em", margin: 0 }}>
                {title}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: "rgba(255,255,255,0.35)",
                  width: "26px", height: "26px",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  cursor: "pointer",
                  fontSize: "11px",
                  flexShrink: 0,
                }}
              >✕</motion.button>
            </div>

            {/* Scrollable body */}
            <div
              className="fnd-scrollbar"
              style={{
                overflowY: "auto",
                padding: "18px 22px",
                color: "rgba(255,255,255,0.58)",
                fontSize: "14px",
                lineHeight: "1.72",
              }}
            >
              {children}
            </div>

            {/* Bottom fade — matches modal bg */}
            <div style={{
              height: "26px",
              flexShrink: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
              pointerEvents: "none",
            }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
