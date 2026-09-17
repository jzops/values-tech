import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*'],

  /**
   * The OG card routes read their fonts from public/fonts at request time.
   * Next's tracer currently picks these up on its own, but the filename is a
   * variable — so make the dependency explicit. Serverless hosts (Netlify,
   * Vercel) build the function bundle from this trace, and a silent miss here
   * means every share card renders in a fallback face.
   */
  outputFileTracingIncludes: {
    '/api/og/home': ['./public/fonts/**'],
    '/api/og/collection': ['./public/fonts/**'],
    '/api/og/[type]/[slug]': ['./public/fonts/**'],
    '/api/og/stance/[id]': ['./public/fonts/**'],
  },
};

export default nextConfig;
