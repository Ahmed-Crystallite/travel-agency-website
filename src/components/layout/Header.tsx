"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 40;

export function Header() {
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrolled || menuOpen;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow,color] duration-500",
        solid
          ? "bg-white/85 py-3 text-ink-900 shadow-[0_1px_0_rgba(11,28,46,0.06)] backdrop-blur-xl"
          : "py-5 text-white",
      )}
    >
      <Container className="flex items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.name} — home`} title={`${siteConfig.name} — home`} onClick={closeMenu}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="opacity-75 transition-opacity hover:opacity-100">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={buttonStyles({ variant: solid ? "dark" : "primary", size: "sm" })}
          >
            Plan my trip
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            title={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 lg:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <Container>
            <ul className="flex flex-col gap-1 pt-4 pb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl transition-colors hover:bg-sand-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
}
