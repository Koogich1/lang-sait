"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TimepickerUI } from "timepicker-ui";

const TimeRangePicker = () : JSX.Element => {
	const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState('00:00');

  const testHandler = useCallback((e: CustomEvent) => {
    setInputValue(`${e.detail.hour}`);
  }, []);

  useEffect(() => {
    const tm = (tmRef.current as unknown) as HTMLDivElement;

		
    const newPicker = new TimepickerUI(tm, {
      theme: 'basic', 
      clockType: "24h",
			switchToMinutesAfterSelectHour: false,
			incrementMinutes: 30,
			minuteMobileLabel: undefined,

    });
    newPicker.create();

    //@ts-ignore
    tm.addEventListener('accept', testHandler);

    return () => {
      //@ts-ignore
      tm.removeEventListener('accept', testHandler);
    };
  }, [testHandler]);

  return (
		<div className='timepicker-ui flex' ref={tmRef}>
			<input
				type='test'
				className='timepicker-ui-input flex bg-[#7ba6db] hover:bg-[#699BD8] text-center w-1/3 h-[50px] rounded-lg shadow-sm cursor-pointer text-white font-bold text-lg transition'
				defaultValue={inputValue}
			/>
		</div>
	)
}

export default TimeRangePicker;