import reactSWC from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactSWC(),
    tsconfigPaths(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024,
      verbose: true,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      threshold: 1024,
      ext: ".br",
      verbose: true,
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|svg)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      png: {
        quality: 75,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      svg: {
        multipass: true,
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
      followSymlinks: false,
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
    hmr: {
      protocol: "ws",
      host: "0.0.0.0",
      port: 3000,
      clientPort: 3000,
      overlay: true,
      timeout: 120000,
    },
  },
  define: {
    // Define global variables
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => {
        if (filename.includes("index.html")) {
          return deps.filter(
            (dep) => dep.includes("react") || dep.includes("vendor"),
          );
        }
        return deps;
      },
    },
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "radix-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
          ],
          "state-vendor": ["zustand"],
        },
        inlineDynamicImports: false,
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return "assets/[name]-[hash][extname]";
          const extType = assetInfo.name.split(".").at(1);
          if (!extType) return "assets/[name]-[hash][extname]";

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        compact: true,
      },
    },
    assetsInlineLimit: 4096,
    dynamicImportVarsOptions: {
      warnOnError: true,
      exclude: [/node_modules/],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
