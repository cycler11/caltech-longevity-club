"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Users } from "lucide-react";

export function GetInvolvedSection() {
  return (
    <section className="w-full py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center gap-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl header-text-glow">
            Join the Movement. Redefine Your Future.
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Be part of the next generation shaping the future of human longevity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sign Up Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Users className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-bold">Students</h3>
                <p className="text-muted-foreground">
                  Sign up to join our community and participate in events
                </p>
                <Button className="neon-border mt-4">
                  Sign up and join the movement
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Mail className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-bold">Companies & Sponsors</h3>
                <p className="text-muted-foreground">
                  Partner with us to connect with talented students and researchers
                </p>
                <Button variant="outline" className="mt-4">
                  Partner with us
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 