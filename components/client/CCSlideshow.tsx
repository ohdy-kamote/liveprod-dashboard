"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

export default function CCSlideshow() {
  const ref = useRef(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [ active, setActive ] = useState(3);
  const indexes = [0, 1, 2, 3, 4, 5, 6];

  useLayoutEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, indexes.length);
    // let item = document.querySelectorAll('.slider .item');
    // console.log({item})
    // console.log({ref: ref.current})
    // console.log({itemsRef})
  }, [indexes.length])

  const loadSlideshow = useCallback(() => {
    let stt = 0;
    (itemsRef.current[active] as any).style.transform = `none`;
    (itemsRef.current[active] as any).style.zIndex = 1;
    (itemsRef.current[active] as any).style.filter = `none`;
    (itemsRef.current[active] as any).style.opacity = 1;
    for (let i = active + 1; i < itemsRef.current.length; i++) {
      stt++;
      (itemsRef.current[i] as any).style.transform = `translateX(${180 * stt}px) scale(${1 - 0.3*stt}) perspective(16px) rotateY(-0.45deg)`;
      (itemsRef.current[i] as any).style.zIndex = -stt;
      (itemsRef.current[i] as any).style.filter = `blur(5px)`;
      (itemsRef.current[i] as any).style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      (itemsRef.current[i] as any).style.transform = `translateX(${-180 * stt}px) scale(${1 - 0.3*stt}) perspective(16px) rotateY(0.45deg)`;
      (itemsRef.current[i] as any).style.zIndex = -stt;
      (itemsRef.current[i] as any).style.filter = `blur(5px)`;
      (itemsRef.current[i] as any).style.opacity = stt > 2 ? 0 : 0.6;
    }
  }, [active])

  useEffect(() => {
    loadSlideshow();
  }, [loadSlideshow])

  return (
    <div className="slider relative w-full h-96 overflow-hidden">
      {indexes.map((index) => (
        <div key={index} ref={el => {
          itemsRef.current[index] = el
        }} className="item absolute w-[500px] h-[320px] text-justify rounded-xl p-[20px] top-0 left-[calc(50%_-_245px)] bg-white duration-700">
          <h1>Slide {index + 1}</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sint distinctio ipsum, et ex quidem nobis expedita modi iusto repudiandae libero laudantium velit culpa inventore, aliquid vitae earum, ratione provident!
        </div>
      ))}
      <button onClick={() => setActive(active - 1 >= 0 ? active - 1 : active)} id="prev" className="absolute top-[40%] text-white bg-transparent border-none text-2xl font-mono font-bold left-12">{"<"}</button>
      <button onClick={() => setActive(active + 1 < indexes.length ? active + 1 : active)} id="next" className="absolute top-[40%] text-white bg-transparent border-none text-2xl font-mono font-bold right-12 left-[unset]">{">"}</button>
    </div>
  )
}