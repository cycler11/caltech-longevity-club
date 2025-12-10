"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Logo {
  name: string
  id: number
  img: React.ComponentType<any>
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  // const shuffled = [...array]
  // for (let i = shuffled.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1))
  //   ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  // }
  // return shuffled
  return array;
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  // If we don't have enough unique logos for all columns, duplicate some logos
  const requiredLogos = Math.max(columnCount, allLogos.length);
  let extendedLogos = [...allLogos];
  
  while (extendedLogos.length < requiredLogos) {
    extendedLogos = [...extendedLogos, ...allLogos];
  }
  
  const shuffled = shuffleArray(extendedLogos);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  // First assign unique initial logos to each column to prevent duplicates
  const uniqueInitialLogos = [...allLogos];
  for (let i = 0; i < columnCount; i++) {
    if (uniqueInitialLogos.length > 0) {
      // Take a random logo from unique logos
      const randomIndex = Math.floor(Math.random() * uniqueInitialLogos.length);
      const logo = uniqueInitialLogos.splice(randomIndex, 1)[0];
      columns[i].push(logo);
    }
  }

  // For each column, build a sequence of logos where adjacent logos are different
  const remainingLogos = shuffleArray(shuffled);
  
  // Helper function to find a logo that's different from the last one in the column
  const findDifferentLogo = (column: Logo[], pool: Logo[]): Logo | null => {
    if (column.length === 0 || pool.length === 0) return null;
    
    const lastLogo = column[column.length - 1];
    for (let i = 0; i < pool.length; i++) {
      if (pool[i].id !== lastLogo.id) {
        return pool.splice(i, 1)[0];
      }
    }
    return null;
  };

  // Determine maximum number of logos per column
  const maxLength = Math.ceil(allLogos.length / columnCount) + 1;

  // Fill columns with different logos
  for (let i = 0; i < columnCount; i++) {
    while (columns[i].length < maxLength) {
      // Try to find a logo different from the last one
      let nextLogo = findDifferentLogo(columns[i], remainingLogos);
      
      // If we can't find a different logo, reshuffle and try again
      if (!nextLogo) {
        // Reset remaining logos with new shuffle excluding those currently showing
        remainingLogos.push(...shuffleArray(allLogos));
        nextLogo = findDifferentLogo(columns[i], remainingLogos);
      }
      
      if (nextLogo) {
        columns[i].push(nextLogo);
      }
    }
  }

  return columns;
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000
    const columnDelay = index * 200
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex])

    return (
      <motion.div
        className="relative h-20 w-32 md:h-24 md:w-40 overflow-hidden md:h-24 md:w-48 glass-card rounded-lg p-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center opacity-70 grayscale"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 0.7,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <CurrentLogo className="h-full w-full p-1 md:p-2 object-contain" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

LogoColumn.displayName = 'LogoColumn'

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [activeLogos, setActiveLogos] = useState<Set<number>>(new Set())

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Track which logos are currently visible
  useEffect(() => {
    if (logoSets.length === 0) return
    
    const cycleInterval = 2000
    const currentActiveLogos = new Set<number>()
    
    logoSets.forEach((column, columnIndex) => {
      const columnDelay = columnIndex * 200
      const adjustedTime = (currentTime + columnDelay) % (cycleInterval * column.length)
      const logoIndex = Math.floor(adjustedTime / cycleInterval)
      
      if (column[logoIndex]) {
        currentActiveLogos.add(column[logoIndex].id)
      }
    })
    
    setActiveLogos(currentActiveLogos)
  }, [currentTime, logoSets])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount)
    setLogoSets(distributedLogos)
  }, [logos, columnCount])

  return (
    <div className="flex justify-center items-center space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export { LogoColumn };
