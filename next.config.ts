import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["prisma", "@prisma/client"],
};

export default nextConfig;
