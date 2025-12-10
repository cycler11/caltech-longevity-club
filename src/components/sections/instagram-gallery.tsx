"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Instagram, ExternalLink, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp?: string;
}

interface InstagramGalleryProps {
  posts?: InstagramPost[];
  username?: string;
}

// Mock data for demonstration - replace with real API call
const mockPosts: InstagramPost[] = [
  {
    id: '1',
    media_url: '/feature-2/Caltech Longevity Hackathon.avif',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Caltech Longevity Hackathon 2025',
    media_type: 'IMAGE',
  },
  {
    id: '2',
    media_url: '/feature-2/richard diaz.jpg',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Speaker Event with Richard Diaz',
    media_type: 'IMAGE',
  },
  {
    id: '3',
    media_url: '/feature-2/Matt Scholz.jpg',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Workshop with Matt Scholz',
    media_type: 'IMAGE',
  },
  {
    id: '4',
    media_url: '/feature-2/2025-05-20 20.54.26.jpg',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Community Event',
    media_type: 'IMAGE',
  },
  {
    id: '5',
    media_url: '/events/Caltech Longevity Club Meeting.avif',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Club Meeting',
    media_type: 'IMAGE',
  },
  {
    id: '6',
    media_url: '/events/Caltech Longevity Hackathon.avif',
    permalink: 'https://www.instagram.com/caltechlongevity/',
    caption: 'Hackathon Highlights',
    media_type: 'IMAGE',
  },
];

export function InstagramGallery({ posts, username = 'caltechlongevity' }: InstagramGalleryProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [galleryPosts, setGalleryPosts] = useState<InstagramPost[]>(posts || mockPosts);
  const [loading, setLoading] = useState(!posts);

  // Fetch Instagram posts from API
  useEffect(() => {
    if (posts) {
      setGalleryPosts(posts);
      setLoading(false);
      return;
    }

    async function fetchInstagramPosts() {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        const data = await response.json();
        
        // If API returns posts, use them; otherwise use mock data
        if (Array.isArray(data) && data.length > 0) {
          setGalleryPosts(data);
        } else {
          // Fallback to mock data if API returns empty array
          setGalleryPosts(mockPosts);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        // Fallback to mock data on error
        setGalleryPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [posts]);

  if (loading) {
    return (
      <section className="w-full py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-24 bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-5xl font-bold header-text-glow">
                Follow Our Journey
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what we're up to on Instagram
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-full border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10"
            >
              <a
                href={`https://www.instagram.com/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow @{username}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {galleryPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg"
                  onClick={() => setSelectedPost(post)}
                >
                  <Image
                    src={post.media_url}
                    alt={post.caption || 'Instagram post'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Caption preview */}
                  {post.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal for viewing full post */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-white/10">
          {selectedPost && (
            <div className="relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto md:h-[600px]">
                  <Image
                    src={selectedPost.media_url}
                    alt={selectedPost.caption || 'Instagram post'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                
                <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Instagram className="w-6 h-6 text-orange-500" />
                      <span className="font-semibold text-white">@{username}</span>
                    </div>
                    
                    {selectedPost.caption && (
                      <p className="text-white/80 mb-4 whitespace-pre-wrap">
                        {selectedPost.caption}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    <a
                      href={selectedPost.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View on Instagram
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

