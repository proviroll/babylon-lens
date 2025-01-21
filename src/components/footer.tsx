import { Github, Globe, Twitter } from "lucide-react";
import { MaxWidthContainer } from "./max-width-container";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <p className="text-sm text-muted-foreground">Powered by Proviroll</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/babylonchain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://babylonchain.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Website</span>
            </a>
            <a
              href="https://twitter.com/babylon_chain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
