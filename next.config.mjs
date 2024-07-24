/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO: Enable the check again. This is now to disable next.js checking node_modules type errors on building the app
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.node = {
      __dirname: true,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true, removeViewBox: true },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(ttf|eot|woff(2)? )(\?[a-z0-9=&.]+)?$/,
      use: ["base64-inline-loader"],
    });

    return config;
  },
};

export default nextConfig;
