"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export const SkeletonTwo = () => {
  const images = [
    "/feature-2/richard diaz.jpg",
    // "/feature-2/ralph.jpg",
    "/feature-2/2025-05-20 20.54.26.jpg",
    "/feature-2/Caltech Longevity Hackathon.avif",
  ];

  const imageVariants = {
    whileHover: { scale: 1.1, rotate: 0, zIndex: 100 },
    whileTap: { scale: 1.1, rotate: 0, zIndex: 100 },
  };

  return (
    <div className="relative flex flex-col items-start p-4 sm:p-8 gap-6 sm:gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-10 sm:-ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{ rotate: [0.4,-0.6,0.8][idx % 3] * 20 - 10 }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-2 sm:-mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="CalTech Longevity Event Showcase"
              width="500"
              height="500"
              className="rounded-lg h-32 w-32 sm:h-40 sm:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      {/* <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{ rotate: [-0.4,0.6,-0.8][idx % 3] * 20 - 10 }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-2 sm:-mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="CalTech Longevity Event Showcase"
              width="500"
              height="500"
              className="rounded-lg h-32 w-32 sm:h-40 sm:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div> */}

      <div className="absolute left-0 z-[100] inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
}; 