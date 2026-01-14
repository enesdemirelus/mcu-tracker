"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "./components/ModeToggle";

const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const doomsdayDate = new Date("2026-12-18T00:00:00");
      const now = new Date();
      const difference = doomsdayDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav
      className="border-b"
      style={{
        backgroundColor: "rgb(4, 47, 46)",
        borderColor: "rgb(4, 120, 87)",
        backgroundImage:
          "linear-gradient(to bottom, rgb(4, 47, 46), rgb(6, 78, 59))",
      }}
    >
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 max-w-full gap-2 sm:gap-4">
        <Link href="/" className="flex items-center px-1 sm:px-2">
          <h1
            className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-none"
            style={{
              fontFamily: "Marvel",
              color: "rgb(236, 253, 245)",
              letterSpacing: "0.08em",
            }}
          >
            DEMIREL'S DOOMSDAY TRACKER
          </h1>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />

          <div
            className="flex items-center gap-1.5 sm:gap-2 border rounded-md px-2 sm:px-3 py-1 sm:py-1.5"
            style={{
              borderColor: "rgba(4, 120, 87, 0.6)",
              backgroundColor: "rgb(24, 24, 27)",
            }}
          >
          <Avatar
            className="size-6 sm:size-7 md:size-8 border"
            style={{
              borderColor: "rgb(5, 150, 105)",
              backgroundColor: "white",
            }}
          >
            <AvatarImage src="/doomsday-logo.png" alt="Avengers Doomsday" />
            <AvatarFallback
              style={{
                backgroundColor: "white",
                color: "rgb(52, 211, 153)",
              }}
            >
              ⚡
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <span
              className="text-[7px] sm:text-[8px] md:text-[9px] font-medium uppercase tracking-wider"
              style={{ color: "rgb(52, 211, 153)" }}
            >
              Avengers Doomsday
            </span>
            <div
              className="flex gap-1 sm:gap-1.5 font-mono text-[9px] sm:text-[10px] md:text-xs font-semibold"
              style={{ color: "rgb(110, 231, 183)" }}
            >
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
