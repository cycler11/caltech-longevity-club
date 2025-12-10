import Image from "next/image";

export function HeroPreload() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden gradient-dark pb-4 md:pb-8 pt-8 md:pt-16">
      <div className="container pt-4 px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Static version of the heading for immediate SSR */}
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-6xl font-bold tracking-tighter">
              <span className="header-text-glow">CALTECH</span>
              <br />
              <span className="text-foreground">LONGEVITY</span>
              <br />
              <span className="header-text-glow">CLUB</span>
            </h1>
          </div>
          
          {/* SEO-friendly description */}
          <p className="max-w-[700px] text-base md:text-lg text-muted-foreground font-light px-2">
            Join a network of driven students, scientists, and industry leaders exploring the frontiers of human potential
          </p>
          
          {/* Static sponsor logos for immediate visibility */}
          <div className="mt-4 md:mt-6 pt-2 md:pt-4 border-t border-border w-full">
            <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 text-center">
              Trusted by leading institutions
            </p>
            <div className="flex justify-center items-center gap-4 w-full">
              {[
                { src: "/sponsors/caltech.png", alt: "Caltech" },
                { src: "/sponsors/brogevity.png", alt: "Brogevity" },
                { src: "/sponsors/blueprint.png", alt: "Blueprint" },
                { src: "/sponsors/vitadao.jpg", alt: "VitaDAO" },
              ].map((logo) => (
                <div key={logo.alt} className="w-24 h-8 relative opacity-50">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 


