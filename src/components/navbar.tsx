"use client";

import { Github, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MaxWidthContainer } from "./max-width-container";
import { ThemeToggle } from "./theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navbar() {
  const { theme } = useTheme();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <MaxWidthContainer>
          <div className="flex h-20 items-center justify-between py-4">
            <Link href="/" className="-ml-2">
              <Image
                src={
                  theme === "light"
                    ? "/assets/babylon-light.svg"
                    : "/assets/babylon-dark.svg"
                }
                alt="Babylon"
                width={150}
                height={150}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 text-muted-foreground md:flex">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Validators
              </Link>
              <button
                onClick={() => setShowComingSoon(true)}
                className="text-sm font-medium hover:text-primary"
              >
                Finality Providers
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="text-sm font-medium hover:text-primary"
              >
                Staking Calculator
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="text-sm font-medium hover:text-primary"
              >
                Stake
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/babylonchain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/validators"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium hover:text-primary"
                    >
                      Validators
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowComingSoon(true);
                      }}
                      className="text-left text-sm font-medium hover:text-primary"
                    >
                      Finality Providers
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowComingSoon(true);
                      }}
                      className="text-left text-sm font-medium hover:text-primary"
                    >
                      Staking Calculator
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowComingSoon(true);
                      }}
                      className="text-left text-sm font-medium hover:text-primary"
                    >
                      Stake
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </MaxWidthContainer>
      </header>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Coming Soon
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              This feature is currently under development and will be available
              soon. Stay tuned for updates!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-start">
            <div className="text-sm text-muted-foreground">
              — The Proviroll Team 🚀
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
