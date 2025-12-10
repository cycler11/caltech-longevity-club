"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { useState } from "react";
import { TeamMember, AdvisorConsultant } from "@/types/team";

const team: TeamMember[] = [
  {
    name: "Andrea Olsen",
    role: "President & Founder",
    image: "/team/andrea-ai.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/andrea-olsen-0987654321/",
    },
  },

  {
    name: "William Wang",
    role: "Vice President",
    image: "/team/William-Wang.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/willwangofficial/",
    },
  },

  {
    name: "Duo Tao",
    role: "Secretary",
    image: "/team/duo-tao.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/duotao",
    },
  },

  {
    name: "Emily Gu",
    role: "Treasurer",
    image: "/team/emily-gu-ai.webp",
    links: {
      github: "https://github.com/emily5-1-2",
    },
  },
];

const consultants: AdvisorConsultant[] = [
  {
    name: "Prof. Evelyne Bischof, MD, PhD, MPH",
    role: "Consultant",
    image: "/team/evelyne.png",
    links: {
      linkedin: "https://www.linkedin.com/in/evelyne-yehudit-bischof/",
    },
    summary: "Prof. Evelyne Bischof is a Swiss board-certified internal medicine specialist, medical director, and professor, with a focus on longevity medicine, oncology, and medical AI, and is a frequent keynote speaker at global conferences.",
    fullText: `Prof. Evelyne Bischof, MD, PhD, MPH (Master of Public Health, University of Liverpool), FEFIM (Fellow of European Federation of Internal Medicine)

Clinic
Medical Director Sheba Longevity Department at Sheba Medica Center, Israel
Department of Smart Hospital and AI at University Hospital Renji of Jiaotong University, Shanghai

Academia
Professor of medicine at Shanghai University of medicine and Health Sciences

Healthy Longevity Medicine:
Healthy Longevity Medicine Society, co-founder and President
Longevity Science Foundation, Head of the Scientific Board
ARDD conference Longevity Medicine Day at - organizer
Longevity Education Hub: co-founder and leader of the first accredited curriculum of Longevity Medicine courses integrated at medical schools, for physicians and managing over 10 000 certified physicians in the network

Specialist in internal medicine (FMH Swiss), full-time clinician at university hospital Sheba, professor of medicine (vienia docendi) at Shanghai University of Medicine and Health Sciences and visiting professor at the University of Tel Aviv.

Frequent keynote speaker at global conferences, such as Milken Institute event, ARDD, Arab Health, Longevity Investors Gstaad, Founder's Forum, Future Health Summit UAE, China Daily summit etc.

Research focus on longevity medicine, oncology and multimorbidity in internal medicine, as well medical Artificial Intelligence (AI) and digital health, precision medicine, biogerontology, and geronto-oncology. EB published over 100 peer-reviewed papers, is a frequent speaker at scientific and medical conferences in Asia and Europe. Board member of various medical societies, e.g. European Federation of Internal Medicine, World Academy of Medical Sciences, Swiss Society of Internal Medicine etc.

EB spent over almost two decades practicing medicine, while also lecturing at medical schools and performing clinical and translational research in Boston (Harvard), New York (Columbia), Shanghai and Switzerland, with extensive experience in scientific research and clinical practice at the following well-known and highly reputable institutions: University Hospital of Basel, Fudan Cancer Institute and Hospital; Zhongshan Hospital, Renji Hospital Shanghai. EB sits on several scientific and advisory boards of biotech and longevity VCs.

Swiss board certified as internal medicine specialist (FMH), trained in Europe, USA and China (Harvard Medical School affiliated hospitals (Mass General Hospital, Beth Israel MD, Dana Farber Institute) and Columbia University NYC; Fudan University hospitals, Shanghai and University Hospitals of Zurich and Basel (Switzerland).`
  },
];

const advisors: AdvisorConsultant[] = [
  {
    name: "Ralph Adolphs, Ph.D.",
    role: "Advisor",
    image: "/team/ralph-ai.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/ralph-adolphs-658a5417/",
    },
    summary: "Ralph Adolphs is a Caltech professor whose lab explores the neural underpinnings of social behavior, working with diverse clinical populations and collaborating across Caltech divisions.",
    fullText: `Ralph Adolphs obtained his Ph.D. at Caltech in 1993, subsequently conducted postdoctoral work with Antonio Damasio in lesion patients, and has been on the faculty at Caltech since 2004. Ralph's laboratory includes undergraduate students, graduate students, postdoctoral fellows and staff that all work on elucidating the neural underpinnings of social behavior. The lab studies several clinical populations, including neurosurgical patients, individuals with rare brain lesions, and people with autism. Extensive use is also made of the adjacent Caltech Brain Imaging Center, and maintains close collaborations with other laboratories at Caltech in both the divisions of biology and the humanities and social sciences.`
  },

  {
    name: "Antonio Rangel, Ph.D.",
    role: "Advisor",
    image: "/team/antonio-rangel-ai.webp",  //added
    links: {
      linkedin: "https://www.linkedin.com/in/antonio-r-930831a8/",  //added
    },
    summary: "Antonio Rangel is Bing Professor of Neuroscience, Behavioral Biology, and Economics at Caltech. He leads the Rangel Neuroeconomics Lab, studying how the brain computes and compares values to make decisions.",
    fullText: `Antonio Rangel is the Bing Professor of Neuroscience, Behavioral Biology, and Economics at the California Institute of Technology and serves as Head Faculty in Residence.

He earned his B.S. at Caltech (1993), M.S. and Ph.D. in Economics from Harvard University (1996, 1998) and was an assistant professor of Economics at Stanford University from 1998 to 2006 before joining Caltech.

Rangel's research investigates the computational and neurobiological basis of human decision-making. Using methods from neuroscience, economics, psychology, and computer science — including fMRI, EEG, TMS, single-unit recordings, eye-tracking, and computational modeling — his lab studies how the brain assigns value to options and compares them when making choices, from simple (e.g., choosing between an apple and an orange) to complex decisions involving self-control or altruism.

He has received numerous honors, including the 2019 NOMIS Distinguished Scientist Award and being named Fellow of the Association for Psychological Science (2018). He previously served as President of the Society for Neuroeconomics (2009-2010) and has held a CAREER Award from the National Science Foundation.`
  },
  
];

export function TeamSection() {
  const [expandedAdvisor, setExpandedAdvisor] = useState<number | null>(null);
  const [expandedConsultant, setExpandedConsultant] = useState<number | null>(null);

  return (
    <section className="w-full py-12 md:py-24 bg-black/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <motion.div 
          className="flex flex-col items-center gap-4 text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl header-text-glow">
            Our Team
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Meet the innovators and thought leaders behind the Caltech Longevity Club
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass overflow-hidden">
                <CardContent className="p-3 md:p-6">
                  <div className="aspect-square mb-3 md:mb-4 overflow-hidden rounded-full w-[120px] md:w-[160px] mx-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{member.role}</p>
                  <div className="flex gap-3 md:gap-4 justify-center">
                    {member.links.github && (
                      <Link 
                        href={member.links.github} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    )}
                    {member.links.linkedin && (
                      <Link 
                        href={member.links.linkedin} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    )}
                    {member.links.email && (
                      <Link 
                        href={member.links.email} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col items-center gap-4 text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl header-text-glow">
            Advisors
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor, idx) => (
            <Card key={advisor.name} className="glass overflow-hidden">
              <CardContent className="p-3 md:p-6 flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="aspect-square mb-3 md:mb-0 overflow-hidden rounded-full w-[100px] md:w-[120px] mx-auto">
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-1">{advisor.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">{advisor.role}</p>
                  <div className="flex gap-3 md:gap-4 mb-2">
                    {advisor.links && advisor.links.linkedin && (
                      <Link 
                        href={advisor.links.linkedin} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    )}
                  </div>
                  <p className="text-sm mb-2">{advisor.summary}</p>
                  <button
                    className="text-xs text-primary underline focus:outline-none"
                    onClick={() => setExpandedAdvisor(expandedAdvisor === idx ? null : idx)}
                  >
                    {expandedAdvisor === idx ? "Hide full text" : "Read full text"}
                  </button>
                  {expandedAdvisor === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 px-4 py-4 rounded-xl text-sm md:text-base whitespace-pre-line text-secondary-foreground bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border border-muted-foreground/20 shadow-lg"
                    >
                      {advisor.fullText}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <motion.div 
          className="flex flex-col items-center gap-4 text-center mb-8 md:mb-12 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl header-text-glow">
            Consultants
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultants.map((consultant, idx) => (
            <Card key={consultant.name} className="glass overflow-hidden">
              <CardContent className="p-3 md:p-6 flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="aspect-square mb-3 md:mb-0 overflow-hidden rounded-full w-[100px] md:w-[120px] mx-auto">
                    <Image
                      src={consultant.image}
                      alt={consultant.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-1">{consultant.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">{consultant.role}</p>
                  <div className="flex gap-3 md:gap-4 mb-2">
                    {consultant.links && consultant.links.linkedin && (
                      <Link 
                        href={consultant.links.linkedin} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    )}
                  </div>
                  <p className="text-sm mb-2">{consultant.summary}</p>
                  <button
                    className="text-xs text-primary underline focus:outline-none"
                    onClick={() => setExpandedConsultant(expandedConsultant === idx ? null : idx)}
                  >
                    {expandedConsultant === idx ? "Hide full text" : "Read full text"}
                  </button>
                  {expandedConsultant === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 px-4 py-4 rounded-xl text-sm md:text-base whitespace-pre-line text-secondary-foreground bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border border-muted-foreground/20 shadow-lg"
                    >
                      {consultant.fullText}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 
