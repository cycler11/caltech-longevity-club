"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SocialProofProps {
  avatars: Array<{ src: string; alt: string }>;
  memberCount: number;
  className?: string;
}

export function SocialProof({ avatars, memberCount, className }: SocialProofProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("glass-card flex items-center gap-3 rounded-full p-2", className)}
    >
      <div className="flex -space-x-4 rtl:space-x-reverse">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            className="h-10 w-10 rounded-full border-muted"
            src={avatar.src}
            width={40}
            height={40}
            alt={avatar.alt}
          />
        ))}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full neon-border
            bg-background text-center text-xs font-medium 
            text-foreground hover:bg-muted"
        >
          {memberCount}+
        </div>
      </div>
      <p className="text-sm text-secondary-foreground pr-2">
        Join our growing community
      </p>
    </motion.div>
  );
} 