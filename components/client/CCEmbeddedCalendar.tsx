"use client";

import { useEffect, useState } from "react";

export default function CCEmbeddedCalendar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ height: 900 }} />;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-[1400px]">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=ccfmain.audio%40gmail.com&ctz=Asia%2FManila"
          style={{ border: 0, width: "100%" }}
          height={900}
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </div>
  );
}
























