import { useEffect, useState } from "react";

export default function BlogHeader() {
  const [text, setText] = useState("");
  const fullText =
    "Stay updated with the latest trends in finance, accounting, and career growth";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white py-12 text-center">
      {/* Reduced title size */}
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-1000 sm:text-4xl mb-4">
        CA Monk Blog
      </h1>
      {/* Typewriter effect with monospace font */}
      <p className="max-w-2xl mx-auto text-lg text-gray-500 min-h-7">
        {text}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
