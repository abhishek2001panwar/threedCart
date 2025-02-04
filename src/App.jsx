/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



function App() {
  const [val, setVal] = useState({
    currentIndex: 1,
    maxIndex: 810,
  });
  const imageLoaded = useRef(0);
  const imageObjects = useRef([]);
  const canvasRef = useRef(null);
  const parent = useRef(null);

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
        if (imageLoaded.current === val.maxIndex) {
          console.log("All images loaded");
          loadImages(val.currentIndex);
        }
      };

      imageObjects.current.push(img);
    }
  };

  const loadImages = (index) => {
    if (index >= 0 && index <= val.maxIndex) {
      const img = imageObjects.current[index];
      const canvas = canvasRef.current;
      if (canvas && img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
          setVal((prev)=>({...prev, currentIndex: index}));
        }
      }
    }
  };

  useGSAP(()=>{
    const tl = gsap.timeline(
      {
        scrollTrigger : {
          trigger: parent.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        
        }
      }
    )
    tl.to(val, {
      currentIndex: val.maxIndex,
      onUpdate: () => {
        loadImages(Math.floor(val.currentIndex));
      },
    })
  })
  return (
    <div className="w-full ">
      <div  ref={parent} className="w-full h-[600vh]">
        <div className="w-full h-screen  sticky top-0 left-0">
          <canvas ref={canvasRef} className="w-full h-screen"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
