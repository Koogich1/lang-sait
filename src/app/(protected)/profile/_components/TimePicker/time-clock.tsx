"use client"
import React from "react";
import clsx from "clsx";

const TimeClock = () => {
  return (
    <div className="min-w-[240px] min-h-[320px] w-[30%] items-center flex flex-col justify-center gap-9 bg-white rounded-xl shadow-lg p-5">
      <div className="text-lg">
        C 10:00 до 17:00
      </div>
      <div className="relative flex items-center justify-end w-[160px] h-[160px] overflow-hidden rounded-full ring-gray-600">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            style={{ height: .5 }}
            className={clsx("absolute w-1/2 origin-left flex justify-end", {
              "rotate-[0deg]": i === 0,
							"rotate-[6deg]": i === 1,
							"rotate-[12deg]": i === 2,
							"rotate-[18deg]": i === 3,
							"rotate-[24deg]": i === 4,
							"rotate-[30deg]": i === 5,
							"rotate-[36deg]": i === 6,
							"rotate-[42deg]": i === 7,
							"rotate-[48deg]": i === 8,
							"rotate-[54deg]": i === 9,
							"rotate-[60deg]": i === 10,
							"rotate-[66deg]": i === 11,
							"rotate-[72deg]": i === 12,
							"rotate-[78deg]": i === 13,
							"rotate-[84deg]": i === 14,
							"rotate-[90deg]": i === 15,
							"rotate-[96deg]": i === 16,
							"rotate-[102deg]": i === 17,
							"rotate-[108deg]": i === 18,
							"rotate-[114deg]": i === 19,
							"rotate-[120deg]": i === 20,
							"rotate-[126deg]": i === 21,
							"rotate-[132deg]": i === 22,
							"rotate-[138deg]": i === 23,
							"rotate-[144deg]": i === 24,
							"rotate-[150deg]": i === 25,
							"rotate-[156deg]": i === 26,
							"rotate-[162deg]": i === 27,
							"rotate-[168deg]": i === 28,
							"rotate-[174deg]": i === 29,
							"rotate-[180deg]": i === 30,
							"rotate-[186deg]": i === 31,
							"rotate-[192deg]": i === 32,
							"rotate-[198deg]": i === 33,
							"rotate-[204deg]": i === 34,
							"rotate-[210deg]": i === 35,
							"rotate-[216deg]": i === 36,
							"rotate-[222deg]": i === 37,
							"rotate-[228deg]": i === 38,
							"rotate-[234deg]": i === 39,
							"rotate-[240deg]": i === 40,
							"rotate-[246deg]": i === 41,
							"rotate-[252deg]": i === 42,
							"rotate-[258deg]": i === 43,
							"rotate-[264deg]": i === 44,
							"rotate-[270deg]": i === 45,
							"rotate-[276deg]": i === 46,
							"rotate-[282deg]": i === 47,
							"rotate-[288deg]": i === 48,
							"rotate-[294deg]": i === 49,
							"rotate-[300deg]": i === 50,
							"rotate-[306deg]": i === 51,
							"rotate-[312deg]": i === 52,
							"rotate-[318deg]": i === 53,
							"rotate-[324deg]": i === 54,
							"rotate-[330deg]": i === 55,
							"rotate-[336deg]": i === 56,
							"rotate-[342deg]": i === 57,
							"rotate-[348deg]": i === 58,
							"rotate-[354deg]": i === 59.
            })}
          >
            <div className="w-[15%] h-full bg-gray-600 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeClock;