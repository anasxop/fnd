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

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function NewsImageCard({ image, dark, col, size = "md", depth = 1 }) {
  const width =
    size === "lg"
      ? rand(260, 320)
      : size === "sm"
      ? rand(160, 210)
      : rand(200, 260);

const duration = useMemo(() => rand(6, 9) * depth, [depth]);
const delay = useMemo(() => rand(0, 3), []);
const headline = useMemo(
  () => headlines[Math.floor(Math.random() * headlines.length)],
  []
);

  return (
    <motion.div
      initial={{ y: "-60%" }}
      animate={{ y: "180%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      className="absolute rounded-xl overflow-hidden"
      style={{
        left: `${col}%`,
        width,
        height: width * 0.65,
        filter: `blur(${depth * 0.35}px)`,
        opacity: dark ? 0.7 / depth : 0.35 / depth,
      }}
    >
      <div className="relative w-full h-full">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: dark
              ? "brightness(1.25) contrast(1.15)"
              : "brightness(1.05) contrast(1.05)",
          }}
        />

        <div
          className={`absolute inset-0 ${
            dark ? "bg-black/5" : "bg-white/40"
          }`}
        />

        <div className="absolute bottom-2 left-2 right-2">
          <p
            className="text-xs font-semibold leading-snug text-white/85"
            style={{ filter: "blur(0.2px)" }}
          >
            {headline}
          </p>
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
        const res = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: "news",
              per_page: 30,
            },
            headers: {
              Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
            },
          }
        );

        const urls = res.data.results.map((img) => img.urls.small);
        setImages(urls);
      } catch (err) {
        console.error("Unsplash fetch error:", err);
      }
    };

    fetchImages();
  }, []);

  const columns = [5, 20, 35, 50, 65, 80];

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden ${
        dark
          ? "bg-[#141414]"
          : "bg-gradient-to-b from-[#f7f8fc] via-[#eef1f9] to-[#f7f8fc]"
      }`}
    >
      {images.slice(0, 14).map((img, i) => (
        <NewsImageCard
          key={i}
          image={img}
          dark={dark}
          col={columns[i % columns.length]}
          size={i % 3 === 0 ? "lg" : i % 3 === 1 ? "md" : "sm"}
          depth={i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1}
        />
      ))}
    </div>
  );
}
