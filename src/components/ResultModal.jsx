import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultModal({ open, onClose, loading, result }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isReal = result?.final_verdict === "Real";
  const isFake = result?.final_verdict === "Fake";

  const glowColor   = isFake ? "rgba(239,68,68,0.45)"   : isReal ? "rgba(34,197,94,0.45)"   : "rgba(234,179,8,0.45)";
  const glowStrong  = isFake ? "rgba(239,68,68,0.7)"    : isReal ? "rgba(34,197,94,0.7)"    : "rgba(234,179,8,0.7)";
  const verdictBg   = isFake ? "rgba(239,68,68,0.14)"   : isReal ? "rgba(34,197,94,0.14)"   : "rgba(234,179,8,0.14)";
  const verdictText = isFake ? "#f87171"                : isReal ? "#4ade80"                : "#facc15";
  const verdictBorder = isFake ? "rgba(248,113,113,0.32)" : isReal ? "rgba(74,222,128,0.32)" : "rgba(250,204,21,0.32)";
  const barGradient = isFake
    ? "linear-gradient(90deg,#ef4444,#f87171)"
    : isReal
    ? "linear-gradient(90deg,#16a34a,#4ade80)"
    : "linear-gradient(90deg,#ca8a04,#facc15)";

  /* Navbar-matched base: bg-black/40 backdrop-blur-xl border-white/10 */
  const baseBg     = "rgba(0,0,0,0.40)";
  const baseBorder = "rgba(255,255,255,0.10)";
  const baseBlur   = "blur(24px)";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(18px)" }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 36, scale: 0.96 }}
          transition={{ type: "spring", damping: 24, stiffness: 240 }}
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "460px",
            margin: "0 16px",
            borderRadius: "20px",
            padding: "24px",
            background: baseBg,
            backdropFilter: baseBlur,
            WebkitBackdropFilter: baseBlur,
            border: `1px solid ${baseBorder}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
            overflow: "hidden",
          }}
        >

          <div style={{ position: "relative", zIndex: 1 }}>

            {loading ? (
              /* ── Loading ── */
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 0 20px", gap:"24px" }}>

                {/* Spinner — no outer glow */}
                <div style={{ position:"relative", width:"56px", height:"56px" }}>
                  <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.08)" }} />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1.5px solid transparent", borderTopColor:"rgba(255,255,255,0.72)" }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                    style={{ position:"absolute", inset:"6px", borderRadius:"50%", border:"1px solid transparent", borderTopColor:"rgba(255,255,255,0.22)" }}
                  />
                </div>

                <div style={{ textAlign:"center" }}>
                  <p style={{ color:"rgba(255,255,255,0.85)", fontWeight:600, fontSize:"15px", margin:"0 0 4px", letterSpacing:"-0.01em" }}>Analyzing with AI</p>
                  <p style={{ color:"rgba(255,255,255,0.32)", fontSize:"13px", margin:0 }}>Processing your content…</p>
                </div>

                <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px" }}>
                  {[100,78,60].map((w,i) => (
                    <motion.div key={i}
                      initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                      transition={{ delay: 0.2+i*0.1 }}
                      style={{ height:"6px", borderRadius:"99px", width:`${w}%`, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}
                    >
                      <motion.div
                        animate={{ x:["-100%","230%"] }}
                        transition={{ duration:1.7, repeat:Infinity, ease:"easeInOut", delay:i*0.2 }}
                        style={{ height:"100%", width:"35%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.11),transparent)" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

            ) : (
              /* ── Result ── */
              <>
                {/* Header */}
                <motion.div
                  initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.3 }}
                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}
                >
                  <h2 style={{ color:"rgba(255,255,255,0.88)", fontWeight:600, fontSize:"15px", letterSpacing:"-0.015em", margin:0 }}>
                    Verification Result
                  </h2>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale:1.12, rotate:90 }} whileTap={{ scale:0.9 }}
                    transition={{ duration:0.18 }}
                    style={{ color:"rgba(255,255,255,0.35)", width:"26px", height:"26px", borderRadius:"50%",
                             display:"flex", alignItems:"center", justifyContent:"center",
                             background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)",
                             cursor:"pointer", fontSize:"11px" }}
                  >✕</motion.button>
                </motion.div>

                {/* Verdict badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.82 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.1, duration:0.45, ease:[0.22,1,0.36,1] }}
                  style={{ marginTop:"24px", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}
                >
                  <motion.span
                    animate={{ boxShadow: [
                      `0 0 6px ${glowColor}, 0 0 12px ${glowColor.replace("0.45","0.2")}`,
                      `0 0 10px ${glowStrong.replace("0.7","0.55")}, 0 0 18px ${glowColor.replace("0.45","0.25")}`,
                      `0 0 6px ${glowColor}, 0 0 12px ${glowColor.replace("0.45","0.2")}`,
                    ]}}
                    transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
                    style={{ padding:"7px 22px", borderRadius:"99px", fontSize:"14px", fontWeight:600,
                             background:verdictBg, color:verdictText, border:`1px solid ${verdictBorder}` }}
                  >
                    {result?.final_verdict}
                  </motion.span>
                  <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.28)", letterSpacing:"0.04em" }}>Gemini AI</span>
                </motion.div>

                {/* Separator */}
                <div style={{ height:"1px", background:"rgba(255,255,255,0.07)", margin:"20px 0 0" }} />

                {/* Confidence */}
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }}
                  style={{ marginTop:"18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"9px" }}>
                    <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Confidence</span>
                    <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.6)", fontWeight:600 }}>{result?.confidence}%</span>
                  </div>
                  <div style={{ width:"100%", height:"5px", borderRadius:"99px", background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
                    <motion.div
                      initial={{ width:0 }}
                      animate={{ width:`${result?.confidence||0}%` }}
                      transition={{ duration:1.1, delay:0.35, ease:[0.22,1,0.36,1] }}
                      style={{ height:"100%", borderRadius:"99px", background:barGradient }}
                    />
                  </div>
                </motion.div>

                {/* Explanation */}
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                  style={{ marginTop:"18px" }}>
                  <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:"7px" }}>Explanation</p>
                  <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.62)", lineHeight:"1.68", margin:0 }}>{result?.explanation}</p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
