import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const infoColumns = [
  {
    title: "Company & Legal",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Press", href: "/press" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "FAQs", href: "/help" },
      { label: "Stay Safe", href: "/safety" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Guides & Blog",
    links: [
      { label: "MotorGuide BD", href: "/guides/motor" },
      { label: "PropertyGuide BD", href: "/guides/property" },
      { label: "Official Blog", href: "/blog" },
    ],
  },
];

const contactDetails = [
  {
    icon: MapPin,
    label: "House 105, Road 12, Banani",
    description: "Dhaka 1213, Bangladesh",
  },
  {
    icon: Phone,
    label: "+880 1302-000000",
    description: "Support: 10am – 10pm",
  },
  {
    icon: Mail,
    label: "support@allpricebd.com",
    description: "We reply within 24 hours",
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/20 text-sm text-muted-foreground bg-primary/20">
      <div className="relative">
        <div className="flex flex-col gap-8 px-6 py-8">

          <div className="container max-w-7xl mx-auto grid gap-12 text-sm text-muted-foreground lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
            <div className="space-y-5 text-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <p className="text-lg font-semibold">All Price BD</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bangladesh&rsquo;s trusted marketplace for buying and selling everything—from electronics and vehicles to property and services.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                {contactDetails.map(({ icon: Icon, label, description }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground/80">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {infoColumns.map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  {title}
                </p>
                <ul className="space-y-2 text-sm">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 transition hover:text-foreground"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-border/30" />

          <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} All Price BD. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
