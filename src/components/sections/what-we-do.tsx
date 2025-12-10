"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Network, Dna, Rocket } from "lucide-react";

const features = [
  {
    title: "Advanced Biohacking",
    description: "Access cutting-edge longevity technologies and personalized aging interventions",
    icon: Brain,
  },
  {
    title: "Research Network",
    description: "Connect with pioneering scientists and biotech entrepreneurs in aging research",
    icon: Network,
  },
  {
    title: "Innovation Hub",
    description: "Develop breakthrough longevity projects and anti-aging solutions",
    icon: Dna,
  },
  {
    title: "Career Launch",
    description: "Fast-track your career in longevity biotechnology and aging research",
    icon: Rocket,
  },
];

export function WhatWeDoSection() {
  return (
    <section className="w-full py-24 bg-black/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl header-text-glow">
            Advancing Longevity Science
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Empowering the next generation of longevity scientists and biotech innovators at Caltech
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:border-primary/50 transition-colors">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 