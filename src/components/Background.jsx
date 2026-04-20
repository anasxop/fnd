import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import axios from "axios";

const headlines = [
  "Government announces major policy shift",
  "Global markets react to breaking news",
  "Experts warn about misinformation",
  "New study reveals shocking results",
  "Public opinion shifts nationwide",
  "Breaking: Officials issue statement",
  "Scientists publish new findings",
  "Major update from international agencies",
];

function rand(min, max) { return Math.random() * (max - min) + min; }

function NewsImageCard({ image, dark, col, size = "md", depth = 1 }) {
  const width    = size === "lg" ? rand(260,320) : size === "sm" ? rand(160,210) : rand(200,260);
  const duration = useMemo(() => rand(6,9) * depth, [depth]);
  const delay    = useMemo(() => rand(0,3), []);
  const headline = useMemo(() => headlines[Math.floor(Math.random() * headlines.length)], []);

  return (
    <motion.div
      initial={{ y: "-60%" }}
      animate={{ y: "180%" }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className="absolute rounded-2xl overflow-hidden"
      style={{
        left: `${col}%`,
        width,
        height: width * 0.65,
        filter: `blur(${depth * 0.4}px)`,
        opacity: dark ? 0.55 / depth : 0.22 / depth,
      }}
    >
      <div className="relative w-full h-full">
        <img src={image} alt="" className="w-full h-full object-cover"
          style={{ filter: dark
            ? "brightness(1.1) contrast(1.1) saturate(0.7)"
            : "brightness(0.95) contrast(1.05) saturate(0.8)"
          }}
        />
        <div className={`absolute inset-0 ${dark ? "bg-black/25" : "bg-white/55"}`} />
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-xs font-medium leading-snug text-white/65" style={{ filter: "blur(0.3px)" }}>{headline}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Background() {
  const { dark } = useContext(ThemeContext);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("https://api.unsplash.com/search/photos", {
          params: { query: "news", per_page: 30 },
          headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}` },
        });
        setImages(res.data.results.map(img => img.urls.small));
      } catch (err) { console.error("Unsplash fetch error:", err); }
    };
    fetchImages();
  }, []);

  const columns = [5, 20, 35, 50, 65, 80];

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-700
      ${dark ? "bg-[#0c0c0c]" : "bg-[#f5f5f7]"}`}
    >
      {/* Ambient orbs */}
      {dark ? (
        <>
          <div className="orb w-[500px] h-[500px] bg-indigo-950/50 top-[-180px] left-[-80px]" style={{ animationDelay: "0s" }} />
          <div className="orb w-[420px] h-[420px] bg-slate-800/60 bottom-[-130px] right-[-60px]" style={{ animationDelay: "5s" }} />
        </>
      ) : (
        <>
          <div className="orb w-[500px] h-[500px] bg-blue-100/80 top-[-180px] left-[-80px]" style={{ animationDelay: "0s", filter: "blur(70px)" }} />
          <div className="orb w-[420px] h-[420px] bg-slate-100/90 bottom-[-130px] right-[-60px]" style={{ animationDelay: "5s", filter: "blur(70px)" }} />
        </>
      )}

      {images.slice(0,14).map((img,i) => (
        <NewsImageCard key={i} image={img} dark={dark}
          col={columns[i % columns.length]}
          size={i%3===0?"lg":i%3===1?"md":"sm"}
          depth={i%3===0?3:i%3===1?2:1}
        />
      ))}
    </div>
  );
}
