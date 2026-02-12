import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Container } from "./container";
import { APP_NAME, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons = {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
};

export function Footer() {
  return (
    <footer
      className="border-t border-neutral-800 bg-neutral-950"
      role="contentinfo"
    >
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                <span className="text-sm font-bold text-neutral-950">S</span>
              </div>
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              Discover unique stays and experiences around the world. Your next
              adventure starts here.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-amber-500"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
