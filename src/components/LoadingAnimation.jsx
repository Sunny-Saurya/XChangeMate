import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingAnimation = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {

    const text = textRef.current.innerText;
    const letters = text.split("").map(
      (char) => `<span class='letter'>${char}</span>`
    ).join("");

    textRef.current.innerHTML = letters;

    // GSAP animation
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete(); 
      },
    });

    tl.from(".letter", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
    })
      .to(".letter", {
        opacity: 1,
        scale: 1.2,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "bounce.out",
      })
      .to(".letter", {
        opacity: 0,
        y: -30,
        scale: 0.8,
        stagger: 0.03,
        duration: 0.5,
        ease: "power2.in",
        delay: 1,
      })
      .to(loaderRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 0.5,
        ease: "power3.out",
      })
      .set(loaderRef.current, { display: "none" });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="bg-black h-screen w-screen flex justify-center items-center fixed top-0 left-0 z-50"
    >
      <h3 ref={textRef} className="text-white text-4xl font-bold">
        Welcome To <span className="text-blue-500 ">XChangeMate</span>
      </h3>
    </div>
  );
};

export default LoadingAnimation;
