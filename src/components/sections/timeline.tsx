"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Briefcase, Target, Users } from "lucide-react";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 bg-black/50 min-h-screen flex items-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <motion.h2 
            style={{ opacity, scale }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl header-text-glow"
          >
            Our Motivation
          </motion.h2>
          <motion.p 
            style={{ opacity }}
            className="max-w-[700px] text-muted-foreground"
          >
            Building the future of longevity at Caltech
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Goals */}
          <div className="space-y-8">
            <Card className="glass hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Network className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Powerful Network</h3>
                    <p className="text-muted-foreground">
                      Create a powerful network in the biohacking field, connecting students with industry leaders
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Industry Access</h3>
                    <p className="text-muted-foreground">
                      Involve external start-ups, businesses and world-class leaders to access resources and job opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Vision */}
          <motion.div 
            style={{ opacity, scale }}
            className="relative"
          >
            <Card className="glass border-primary/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="p-3 rounded-full bg-primary/20 border border-primary/50">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center mt-4 mb-6">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A strong group of Caltech students building products, starting projects, 
                  and contributing to longevity and biohacking from a young age.
                </p>
                
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Bi-weekly industry, executive, and science guest speakers leading
                      discussions and offering resources
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 