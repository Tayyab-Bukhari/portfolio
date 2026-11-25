/** Builds a static website into the "out" folder, which any host can serve. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  agentRules: false,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
