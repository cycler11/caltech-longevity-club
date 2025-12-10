"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WavyBackground } from "../ui/wavy-background";
import type { Event } from "@/types/events";
import { getEvents } from "@/data/events";

const DEFAULT_SPEAKER_IMAGE = "/events/default.png";

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-row sm:flex-col gap-3 sm:gap-6">

          {/* IMAGE */}
          <div className="w-12 h-12 sm:w-full sm:h-auto sm:max-w-[200px] flex-shrink-0">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={
                  event.id === "club-fair"
                    ? "/events/career%20fair.jpg"
                    : event.speakers[0]?.photo || DEFAULT_SPEAKER_IMAGE
                }
                alt={event.speakers[0]?.name || event.topic}
                width={300}
                height={300}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-1 min-w-0">
            {event.speakers.length > 0 ? (
              <>
                {event.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className={index > 0 ? "mt-3 pt-3 sm:mt-6 sm:pt-6 border-t" : ""}
                  >
                    <h3 className="text-base sm:text-2xl font-bold truncate">
                      {speaker.name}
                    </h3>

                    <p className="text-xs sm:text-base text-muted-foreground mb-2 sm:mb-4">
                      {speaker.title}
                    </p>

                    {/* SOCIAL ICONS */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      {speaker.social?.linkedin && (
                        <Link
                          href={speaker.social.linkedin}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      )}

                      {speaker.social?.twitter && (
                        <Link
                          href={speaker.social.twitter}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      )}

                      {speaker.social?.github && (
                        <Link
                          href={speaker.social.github}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      )}

                      {speaker.social?.luma && (
                        <Link
                          href={speaker.social.luma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] sm:text-xs text-muted-foreground hover:bg-accent"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Luma</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}

                <h4 className="text-sm sm:text-xl font-semibold mt-4">
                  {event.topic}
                </h4>
              </>
            ) : (
              <h3 className="text-base sm:text-2xl font-bold mb-4">
                {event.topic}
              </h3>
            )}

            {/* DATE / LOCATION */}
            <div className="space-y-2 text-xs sm:text-base mt-1 sm:mt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{event.date} at {event.time}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            {event.url && (
              <div className="mt-4">
                <Link href={event.url} target="_blank">
                  <Button size="sm" className="rounded-full px-4">
                    RSVP on Luma →
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EventsSection() {
  const { upcoming, past } = getEvents();

  return (
    <section className="w-full py-8 sm:py-12 md:py-24">
      <WavyBackground className="max-w-4xl mx-auto">

        <div className="container px-3 sm:px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold header-text-glow">
              Events
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-3">
              Join us for exciting talks and discussions with industry leaders in longevity field.
            </p>
          </motion.div>

          {/* UPCOMING */}
          {upcoming.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Upcoming Events
              </h3>

              <div className="space-y-6">
                {upcoming.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* PAST */}
          {past.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mb-8 text-center">Past Events</h3>

              <div className="space-y-6">
                {past.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </WavyBackground>
    </section>
  );
}
