"use client";
import { Button } from "@/components/ui/button";
import { useSwiper } from "swiper/react";

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="w-[100%] h-[100%] absolute items-center flex justify-between z-10 mt-[0]">
      <Button onClick={() => swiper.slidePrev()}>prev</Button>
      <Button onClick={() => swiper.slideNext()}>next</Button>
    </div>
  );
};

export default SwiperNavButtons;
