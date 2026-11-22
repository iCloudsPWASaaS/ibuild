import { useState, useEffect } from "react";

export function TimerCount() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="text-sm text-primary2 ">
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div className="text-2xl font-bold text-transparent bg-clip-text text-gradient">
        {time.toLocaleTimeString()}
      </div>
    </div>

  );
}