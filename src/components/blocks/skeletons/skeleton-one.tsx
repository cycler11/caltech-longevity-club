"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export const SkeletonOne = () => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-2xl">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/feature-1/caltech-2.jpg"
          alt="Banner image"
          fill
          className="object-cover"
          sizes="50vw, 33vw"
          priority
        />
      </AspectRatio>
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/30 to-transparent dark:from-black/60 dark:via-black/30 dark:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-black/40 dark:via-transparent dark:to-transparent" />
    </div>
  )
}

