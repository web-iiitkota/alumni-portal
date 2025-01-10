import { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import C2 from "../assets/2.webp";
import C3 from "../assets/3.webp";
import C1 from "../assets/1.webp";
import { useKeenSlider } from "keen-slider/react";

const carouselHome = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged() {
      resetTimer();
    },
  });

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      instanceRef.current?.next();
    }, 8000); // 5000 ms interval for automatic slide change
  };

  const resetTimer = () => {
    clearInterval(timer);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, [instanceRef]);

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider lg:h-[78vh] md:h-[65vh] sm:h-[55vh] h-[30vh] mt-[8.375rem] max-w-980:mt-[90px] max-w-492:mt-[58px]"
      >
        <div className="keen-slider__slide flex justify-center items-center">
          <img src={C1} alt="" className=" object-fill w-full h-full" />
        </div>
        <div className="keen-slider__slide flex justify-center items-center">
          <img src={C2} alt="" className="object-fill w-full h-full" />
        </div>
        <div className="keen-slider__slide flex justify-center items-center">
          <img src={C3} alt="" className="object-fill w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default carouselHome;
