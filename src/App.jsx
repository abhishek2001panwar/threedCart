import { useEffect } from "react";
import { useRef } from "react";
import { use } from "react";
import { useState } from "react";

function App() {
  const [val, setVal] = useState({
    currentIndex: 0,
    maxIndex: 810,
  });
  const imageLoaded = useRef(0);

  useEffect(() => {
    preloadImages();
  });

  const preloadImages = () => {
    for (let i = 0; i < val.maxIndex; i++) {
      const imageUrl = `./cart/frame_${i.toString().padStart(4, "0")}.jpeg`;
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        imageLoaded.current++;
        console.log(imageLoaded.current);
      };
    }
  };
  return (
    <div className="w-full bg-zinc-800">
      <div className="w-full h-[400vh]">
        <div className="w-full h-screen bg-zinc-500 sticky top-0 left-0">
          <canvas></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
