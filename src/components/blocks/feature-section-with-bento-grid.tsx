"use client";

import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkeletonOne } from "./skeletons/skeleton-one";
import { SkeletonTwo } from "./skeletons/skeleton-two";
import { SkeletonThree } from "./skeletons/skeleton-three";
import { SkeletonFour } from "./skeletons/skeleton-four";

export function FeaturesSectionWithBentoGrid() {
  return (
    <section className="w-full py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="px-8">
          <h4 className="text-4xl lg:text-6xl lg:leading-tight mx-auto text-center tracking-tight font-bold header-text-glow mb-6">
            What We Do
          </h4>

          <p className="text-base lg:text-lg max-w-2xl mx-auto text-center font-medium">
            Empowering the next generation of longevity researchers and entrepreneurs
          </p>

          {/* voting new button */}
          <div className="mt-6 flex justify-center">
            <Link
              href="https://atom-meteoroid-b7d.notion.site/2a533e38a36f8036b52bf30ad96dfcd2?pvs=105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gradient-button rounded-full px-6 md:px-8 py-7 sm:py-5 md:py-6 text-base md:text-lg w-full sm:w-auto"
              >
                What would you like to attend? Vote here!
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BentoCard
              title="Workshops"
              description="Hands-on learning sessions with leading researchers."
              skeleton={<SkeletonOne />}
            />

            <BentoCard
              title="Speaker Events"
              description="Talks from pioneers in longevity, AI, and biotechnology."
              skeleton={<SkeletonTwo />}
            />

            <BentoCard
              title="Journal Clubs"
              description="Deep dives into the latest research with peers."
              skeleton={<SkeletonThree />}
            />

            <BentoCard
              title="Community Events"
              description="Build relationships with people shaping the future of health."
              skeleton={<SkeletonFour />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  title,
  description,
  skeleton,
}: {
  title: string;
  description: string;
  skeleton: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-6 hover:bg-black/60 transition"
    >
      <div className="h-40 mb-4 rounded-xl overflow-hidden">
        {skeleton}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-white/70">{description}</p>
    </motion.div>
  );
}
