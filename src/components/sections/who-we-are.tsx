"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Building2 } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import Link from "next/link";
import { URLS } from "@/config/urls";
import { SponsorFormDialog } from "@/components/forms/sponsor-form-dialog";

export function WhoWeAreSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <h1 className="bg-gradient-to-br from-[hsl(var(--orange-bright))] to-[hsl(var(--orange-deep))] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Who We&apos;re Looking For
        </h1>
        <motion.div 
          className="flex flex-col items-center gap-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="max-w-[700px] text-muted-foreground">
            Join our community of innovators and thought leaders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Students */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <GraduationCap className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-bold">Caltech Students</h3>
                <p className="text-muted-foreground">
                  Passionate about longevity science and ready to make an impact in the field
                </p>
                <Button className="mt-4" asChild>
                  <Link href={URLS.NOTION_SIGNUP} target="_blank" rel="noopener noreferrer">
                    Join as a Student
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Building2 className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-bold">Companies & Sponsors</h3>
                <p className="text-muted-foreground">
                  Connect with top-tier talent and support the future of longevity research
                </p>
                <SponsorFormDialog />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 