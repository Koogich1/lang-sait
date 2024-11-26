"use client"

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const MovingImage = ({ src, alt, duration, yOffset, rotate } : {src: string, alt: string, duration: number, yOffset: number, rotate: number}) => {
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(imageRef.current, { y: `-${yOffset}px`, duration: duration, ease: "power1.inOut" });
    }, [duration, yOffset, ]);

    return (
        <Image
            ref={imageRef}
            src={src}
            alt={alt}
            width={30}
            height={30}
            className={`w-12 h-8`}
            style={{ transform: `rotate(${rotate}deg)` }} // Применение поворота
        />
    );
};

export default MovingImage;