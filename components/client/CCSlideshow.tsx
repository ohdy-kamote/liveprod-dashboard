"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

const slides = [0, 1, 2, 3, 4, 5, 6, 9];

export default function CCSlideshow() {
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [ active, setActive ] = useState(slides.length - 1);

  useLayoutEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, slides.length);
  }, [])

  const loadSlideshow = useCallback(() => {
    let stt = 0;
    const upperhand = Math.ceil((slides.length - 1) / 2);
    const lowerhand = Math.floor((slides.length - 1) / 2);
    (itemsRef.current[active] as any).style.transform = `none`;
    (itemsRef.current[active] as any).style.zIndex = 1;
    (itemsRef.current[active] as any).style.filter = `none`;
    (itemsRef.current[active] as any).style.opacity = 1;
    for (let i = 1; i <= upperhand; i++) {
      stt++;
      const nextValue = getNextValue(active + i);
      (itemsRef.current[nextValue] as any).style.transform = `translateX(${140 * stt}px) scale(${1 - 0.3*stt}) perspective(16px) rotateY(-0.35deg)`;
      (itemsRef.current[nextValue] as any).style.zIndex = -stt;
      (itemsRef.current[nextValue] as any).style.filter = `blur(5px)`;
      (itemsRef.current[nextValue] as any).style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = 1; i <= lowerhand; i++) {
      stt++;
      const prevValue = getPrevValue(active - i);
      (itemsRef.current[prevValue] as any).style.transform = `translateX(${-140 * stt}px) scale(${1 - 0.3*stt}) perspective(16px) rotateY(0.35deg)`;
      (itemsRef.current[prevValue] as any).style.zIndex = -stt;
      (itemsRef.current[prevValue] as any).style.filter = `blur(5px)`;
      (itemsRef.current[prevValue] as any).style.opacity = stt > 2 ? 0 : 0.6;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    loadSlideshow();
  }, [loadSlideshow])

  function getNextValue(current: number) {
    const length = slides.length;
    if (current <= length - 1) return current;
    return current - length;
  }

  function getPrevValue(current: number) {
    const length = slides.length;
    if (current >= 0) return current;
    return length + current;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      setActive(getNextValue(active + 1));
    } else if (e.key === "ArrowLeft") {
      setActive(getPrevValue(active - 1));
    }
  }

  return (
    <div onKeyDown={handleKeyDown} className="slider relative w-full h-96 overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} ref={el => {
          itemsRef.current[i] = el
        }} className="item absolute w-[500px] h-[320px] text-justify rounded-xl p-[20px] top-0 left-[calc(50%_-_245px)] bg-white duration-700">
          <h1>Slide {slide + 1}</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sint distinctio ipsum, et ex quidem nobis expedita modi iusto repudiandae libero laudantium velit culpa inventore, aliquid vitae earum, ratione provident!
        </div>
      ))}
      <button onClick={() => setActive(getPrevValue(active - 1))} id="prev" className="absolute top-[40%] text-white bg-transparent border-none text-2xl font-mono font-bold left-12">{"<"}</button>
      <button onClick={() => setActive(getNextValue(active + 1))} id="next" className="absolute top-[40%] text-white bg-transparent border-none text-2xl font-mono font-bold right-12">{">"}</button>
    </div>
  )
}
