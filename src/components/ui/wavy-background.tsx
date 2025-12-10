"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 100,
  backgroundFill,
  blur = 30,
  speed = "fast",
  waveOpacity = 0.6,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slower" | "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waveColors = colors ?? [
    "hsl(110 100% 60%)",  
    "hsl(130 100% 65%)",  
    "hsl(140 100% 70%)",  
    "hsl(120 100% 75%)",  
    "hsl(150 100% 80%)",  
  ];
  

  const getSpeed = () => {
    switch (speed) {
      case "slower":
        return 0.0001;
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const drawWave = (n: number) => {
    nt += getSpeed();
    
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      ctx.globalAlpha = Math.max(0.5, waveOpacity * (1 - (i * 0.1)));
      
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        if (x === 0) {
          ctx.moveTo(x, y + h * 0.5);
        } else {
          ctx.lineTo(x, y + h * 0.5);
        }
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.clearRect(0, 0, w, h);
    if (backgroundFill) {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, w, h);
    }
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center pointer-events-none",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10 pointer-events-auto", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
