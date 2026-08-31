import type { NextConfig } from "next";

const allowLocalWordPressImages =
  process.env.WORDPRESS_URL !== undefined &&
  new URL(process.env.WORDPRESS_URL).hostname === "localhost";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: allowLocalWordPressImages,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8881",
        pathname: "/wp-content/uploads/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cms.temikaze.com",
        port: "",
        pathname: "/wp-content/uploads/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
