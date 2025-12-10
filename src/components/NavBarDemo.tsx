'use client';

import { Home, Image, Calendar, Mail, UserPlus } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { CONTACT_EMAIL } from "@/lib/constants";

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Media', url: '/media', icon: Image },
    { name: 'Events', url: '/events', icon: Calendar },
    { name: 'Contact', url: `mailto:${CONTACT_EMAIL}`, icon: Mail },
    { name: 'Join', url: 'https://atom-meteoroid-b7d.notion.site/12e33e38a36f808c80dcd1ddd0a1d2d9', icon: UserPlus, isCTA: true }
  ];

  return <NavBar items={navItems} />;
} 