import { CONTACT_EMAIL } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-background/5 mt-auto mb-16 sm:mb-0">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            {CONTACT_EMAIL}
          </Link>
          <span className="text-muted-foreground hidden sm:block">•</span>
          <Link
            href="https://www.linkedin.com/company/caltech-longevity-club/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            LinkedIn
          </Link>
          <span className="text-muted-foreground hidden sm:block">•</span>
          <Link 
            href="https://x.com/cit_longevity"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            X (Twitter)
          </Link>
          <span className="text-muted-foreground hidden sm:block">•</span>
          <Link 
            href="https://www.instagram.com/caltechlongevity"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
