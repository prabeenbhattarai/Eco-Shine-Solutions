import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Admin image uploads allow up to 8MB (see MAX_UPLOAD_BYTES); raise the
      // Server Action body limit above that (plus multipart overhead) so large
      // photo uploads aren't rejected with a 1MB "Body exceeded" 413 error.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
