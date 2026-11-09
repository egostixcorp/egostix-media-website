import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/global/JsonLd";

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://media.egostix.com"),
  title: {
    default: "Egostix Media — AI Business Websites, Custom Internal Tools & Automation",
    template: "%s | Egostix Media",
  },
  description:
    "Egostix Media is an AI-native software studio. We engineer high-converting AI business websites, custom internal tools, and workflow automation systems in 2–4 weeks.",
  keywords: [
    "AI business websites",
    "custom internal tools development",
    "AI workflow automation agency",
    "Next.js web development agency",
    "WhatsApp automation for business",
    "creator membership platform development",
    "custom client portal development",
    "SMB admin panel development",
    "Supabase web application development",
    "Egostix Media",
  ],
  authors: [{ name: "Egostix Media", url: "https://media.egostix.com" }],
  creator: "Egostix Engineering Pvt. Ltd.",
  publisher: "Egostix Engineering Pvt. Ltd.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Egostix Media — AI Business Websites, Custom Internal Tools & Automation",
    description:
      "We engineer AI-powered business websites, custom internal tools, creator platforms, and workflow automations for fast-moving teams.",
    url: "https://media.egostix.com",
    siteName: "Egostix Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Egostix Media — AI Business Websites, Custom Internal Tools & Automation",
    description:
      "AI-native software studio building custom business websites, internal tools, and automated workflows.",
    creator: "@egostix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/egostix-media-trans.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://media.egostix.com/#organization",
  name: "Egostix Media",
  legalName: "Egostix Engineering Pvt. Ltd.",
  url: "https://media.egostix.com",
  logo: "https://media.egostix.com/egostix-media-trans.png",
  description:
    "AI-native productized software and media studio engineering business websites, internal tools, creator infrastructure, and workflow automations.",
  parentOrganization: {
    "@type": "Organization",
    name: "Egostix Engineering Pvt. Ltd.",
    url: "https://egostix.com",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-73192-74817",
    contactType: "customer service",
    email: "contact@egostix.com",
    areaServed: "Global",
    availableLanguage: ["English", "Hindi", "Bengali"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Badkulla",
    addressLocality: "Nadia",
    addressRegion: "West Bengal",
    postalCode: "741121",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/egostix",
    "https://linkedin.com/company/egostix",
    "https://github.com/egostix",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://media.egostix.com/#website",
  url: "https://media.egostix.com",
  name: "Egostix Media",
  description: "Where Imagination Meets Intelligence — AI-Native Software & Media Studio",
  publisher: {
    "@id": "https://media.egostix.com/#organization",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="bg-background text-foreground font-inter antialiased transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
