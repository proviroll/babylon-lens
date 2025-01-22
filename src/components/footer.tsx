import { Github, Globe } from "lucide-react";
import { MaxWidthContainer } from "./max-width-container";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <p className="text-sm text-muted-foreground">Powered by Proviroll</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/proviroll/babylon-lens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://proviroll.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Website</span>
            </a>
            <a
              href="https://x.com/proviroll"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X</span>
            </a>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
