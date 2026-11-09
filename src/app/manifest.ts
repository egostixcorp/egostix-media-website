import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Egostix Media — AI-Native Software & Modern Media Studio",
    short_name: "Egostix Media",
    description:
      "Egostix Media engineers AI-powered business websites, custom internal tools, creator infrastructure, and workflow automations.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/egostix-media-trans.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/egostix-media-trans.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

