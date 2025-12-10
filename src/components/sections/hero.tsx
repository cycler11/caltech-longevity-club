"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { SocialProof } from "@/components/ui/social-proof";
import { DeadlineTimer } from "@/components/ui/deadline-timer";
import Link from "next/link";
import { WavyBackground } from "../ui/wavy-background";
import { useRouter } from 'next/navigation';
import { getEvents } from "@/data/events";
import { HeroPill } from "@/components/ui/hero-pill";
import { useIsMobile } from "@/hooks/use-mobile";

// Single reusable logo component
function SponsorLogo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={120}
        height={40}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Logo configuration for the carousel
const sponsorLogos = [
  { name: "Brogevity", src: "/sponsors/brogevity.png" },
  { name: "Caltech", src: "/sponsors/caltech.png" },
  { name: "Insilico", src: "/sponsors/insilico.png" },
  { name: "LongevC", src: "/sponsors/longevc.svg" },
  { name: "Longevity Pledge", src: "/sponsors/logo-white_Longevity.svg" },
  { name: "Retro", src: "/sponsors/retrobio.png.webp" },
  { name: "True Diagnostics", src: "/sponsors/truediagnostics.png" },
  { name: "VitaDAO", src: "/sponsors/vitadao.jpg" },
  { name: "Longgame", src: "/sponsors/longgame_white.png" }
];

// Transform logos into the format expected by LogoCarousel
const allLogos = sponsorLogos.map((logo, index) => ({
  name: logo.name,
  id: index + 1,
  img: (props: { className?: string }) => (
    <SponsorLogo src={logo.src} alt={logo.name} className={props.className} />
  ),
}));

// Update the hero section text
const heroText = {
  mainHeading: "CALTECH LONGEVITY CLUB",
  subheading: "Join a pioneering network of Caltech students, scientists, and biotech leaders advancing human longevity research and innovation. Together, we're decoding aging and extending healthspan through cutting-edge science.",
  trustedBy: "Partnered with leading longevity research institutions",
  memberText: "Active members and growing",
}

// Add this helper function at the top of the file
function getDaysUntil(dateStr: string | null): string {
  if (!dateStr) return '📅 Date TBA';
  
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '📅 Today!';
  if (diffDays === 1) return '📅 Tomorrow!';
  return `📅 In ${diffDays} days`;
}

export function HeroSection() {
  const avatars = [
    { src: "/avatars/1.png", alt: "Member 1" },
    { src: "/avatars/2.png", alt: "Member 2" },
    { src: "/avatars/3.png", alt: "Member 3" },
    { src: "/avatars/4.png", alt: "Member 4" },
  ];

  const router = useRouter();

  const { upcoming: upcomingEvents } = getEvents();
  const nextEvent = upcomingEvents[0]; // First event is the next one due to our sorting

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMobile = useIsMobile();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden gradient-dark pb-4 md:pb-8 pt-8 md:pt-16">
      {/* Smoke Effects */}
      <div className="smoke-effect" />
      <div className="smoke-effect" style={{ animationDelay: "-7s" }} />
      
      {/* Abstract Shapes */}
      <motion.div
        className="abstract-shape w-[600px] h-[600px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          right: "5%",
          top: "10%",
        }}
      />
      <WavyBackground 
        className="max-w-4xl mx-auto h-full"
        containerClassName="h-full"
        waveOpacity={0.3}
        blur={5}
        speed="slower"
        waveWidth={40}
      >
        <div className="container pt-4 px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Add Hero Pill here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroPill 
                href={nextEvent ? (nextEvent.url || "/events") : "/events"}
                label={nextEvent ? nextEvent.topic : "Explore our events"}
                announcement={nextEvent ? getDaysUntil(nextEvent.date) : "📅 Explore our events"}
                target={nextEvent?.url ? "_blank" : undefined}
                rel={nextEvent?.url ? "noopener noreferrer" : undefined}
                className="mb-4"
              />
            </motion.div>

            {/* Main heading - reduced vertical spacing */}
            <div className="space-y-1 md:space-y-2">
              <motion.h1 
                className="text-6xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="header-text-glow">
                  CALTECH
                </span>
                <br />
                <span className="text-foreground">LONGEVITY</span>
                <br />
                <span className="header-text-glow">
                  CLUB
                </span>
              </motion.h1>
            </div>
          
            {/* Subheading - reduced padding */}
            <motion.p 
              className="max-w-[700px] text-base md:text-lg text-secondary-foreground font-light px-2 py-4 rounded-xl bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {heroText.subheading}
            </motion.p>
            
            {/* Updated Timer Component with deadline prop */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <DeadlineTimer deadline="2025-02-25T23:59:59" />
            </motion.div> */}
            
            {/* Social Proof */}
            <SocialProof avatars={avatars} memberCount={60} />
            
            {/* Updated CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="https://atom-meteoroid-b7d.notion.site/12e33e38a36f808c80dcd1ddd0a1d2d9" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="gradient-button rounded-full px-6 md:px-8 py-7 sm:py-5 md:py-6 text-base md:text-lg w-full sm:w-auto"
                >
                  Join the Movement
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="glass hover:bg-white/10 rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto hidden sm:inline-flex"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Sponsor Logos - centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 md:mt-6 pt-2 md:pt-4 border-t border-border w-full"
            >
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 text-center">
                {heroText.trustedBy}
              </p>
              <div className="flex justify-center items-center w-full">
                <LogoCarousel 
                  logos={allLogos}
                  columnCount={isMobile ? 2 : Math.min(4, allLogos.length)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
}