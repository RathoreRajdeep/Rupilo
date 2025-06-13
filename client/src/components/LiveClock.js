import React, { useState, useEffect } from "react";
import './styles/LiveClock.css';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = currentTime.toLocaleDateString("en-IN", { weekday: "long" });
  const date = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).replace("am", "AM").replace("pm", "PM");

  return (
    <div className="live-clock">
      <p>{day}</p>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
};

export default LiveClock;
