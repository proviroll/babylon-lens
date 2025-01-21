"use client";

import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

import { MaxWidthContainer } from "./max-width-container";

export function Navbar() {
  const { theme } = useTheme();

  return (
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

          <nav className="flex items-center gap-6 text-primary/80">
            <Link
              href="/overview"
              className="text-sm font-medium hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/validators"
              className="text-sm font-medium hover:text-primary"
            >
              Validators
            </Link>
            <Link
              href="/finality-providers"
              className="text-sm font-medium hover:text-primary"
            >
              Finality Providers
            </Link>
            <Link
              href="/calculator"
              className="text-sm font-medium hover:text-primary"
            >
              Staking Calculator
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/babylonchain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  );
}
