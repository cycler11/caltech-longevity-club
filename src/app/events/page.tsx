"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, MapPin, Linkedin, X, GithubIcon, Clock, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
import { getEvents } from "@/data/events";
import { Event } from "@/types/events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DEFAULT_SPEAKER_IMAGE = "/events/default.png";

function getDaysUntil(dateStr: string | null): string {
  if (!dateStr) return 'Date TBA';
  
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Past Event';
  if (diffDays === 0) return 'Today!';
  if (diffDays === 1) return 'Tomorrow';
  return `In ${diffDays} days`;
}

function EventCard({ event, variant = 'default' }: { event: Event; variant?: 'featured' | 'default' }) {
  const daysUntil = getDaysUntil(event.date);
  const isPast = event.isPast || (event.date && new Date(event.date) < new Date());
  const isFeatured = variant === 'featured';

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section - Left side, proper size */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="aspect-square rounded-lg overflow-hidden bg-black/10">
              <Image
                src={event.id === "club-fair" ? "/events/career%20fair.jpg" : (event.speakers[0]?.photo || DEFAULT_SPEAKER_IMAGE)}
                alt={event.speakers[0]?.name || event.topic}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority={isFeatured}
              />
            </div>
          </div>

          {/* Content Section - Right side */}
          <div className="flex-1 min-w-0">
            {event.speakers.length > 0 ? (
              <>
                {event.speakers.map((speaker, index) => (
                  <div key={index} className={index > 0 ? 'mt-4' : ''}>
                    <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
                    <p className="text-muted-foreground mb-4">{speaker.title}</p>
                    
                    <div className="flex gap-4 mb-4">
                      {speaker.social?.linkedin && (
                        <Link 
                          href={speaker.social.linkedin} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-5 h-5" />
                        </Link>
                      )}
                      {speaker.social?.twitter && (
                        <Link 
                          href={speaker.social.twitter} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <X className="w-5 h-5" />
                        </Link>
                      )}
                      {speaker.social?.github && (
                        <Link 
                          href={speaker.social.github} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                <h4 className="text-xl font-semibold mb-4 mt-4">{event.topic}</h4>
              </>
            ) : (
              <h3 className="text-2xl font-bold mb-4">{event.topic}</h3>
            )}
            
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span>{event.date || "TBA"} at {event.time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>

            {event.url && !isPast && event.date && new Date(event.date) > new Date() && (
              <Button
                asChild
                className="mt-4 bg-[hsl(var(--orange-bright))] hover:bg-[hsl(var(--orange-vivid))] text-white 
                           shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]
                           border border-[hsl(var(--orange-bright))/0.2] transition-all duration-300"
              >
                <Link 
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  RSVP Now
                  <span className="text-sm">→</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const { featured: featuredEvents, upcoming: upcomingEvents, past: pastEvents } = getEvents();

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex-1 w-full py-12 md:py-24">
        <WavyBackground className="max-w-4xl mx-auto">
          <div className="container px-0 md:px-6">
            {/* Header */}
            <motion.div
              className="flex flex-col items-center gap-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl header-text-glow">
                Events
              </h1>
              <p className="max-w-[700px] text-muted-foreground">
                Join us for exciting talks and discussions with industry leaders in longevity research
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              className="flex justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="rounded-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                All Events
              </Button>
              <Button
                variant={filter === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setFilter('upcoming')}
                className="rounded-full"
              >
                Upcoming
              </Button>
              <Button
                variant={filter === 'past' ? 'default' : 'outline'}
                onClick={() => setFilter('past')}
                className="rounded-full"
              >
                Past Events
              </Button>
            </motion.div>

            {/* Featured Events */}
            {featuredEvents.length > 0 && (filter === 'all' || filter === 'upcoming') && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Featured Event
                </h2>
                <div className="space-y-6">
                  {featuredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <EventCard event={event} variant="featured" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (filter === 'all' || filter === 'upcoming') && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Events</h2>
                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (filter === 'all' || filter === 'past') && (
              <div>
                <h2 className="text-2xl font-bold mb-8 text-center">Past Events</h2>
                <div className="space-y-6">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </WavyBackground>
      </section>
    </main>
  );
}
