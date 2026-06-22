import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // WAJIB ditambahkan untuk GitHub Pages agar aset tidak error 404
  base: "/shilsy-portofolio/",

  plugins: [react()],

  // Menggunakan esbuild bawaan Vite untuk menghapus console.log (Lebih cepat & tanpa install terser)
  esbuild: {
    drop: ["console", "debugger"],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - React & friends
          "react-vendor": ["react", "react-dom"],

          // Animation libraries
          "motion-vendor": ["framer-motion", "motion", "gsap"],

          // Three.js core
          "three-core": ["three"],

          // React Three Fiber ecosystem (sangat berat!)
          "r3f-vendor": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/rapier",
          ],

          // Spline (berat juga!)
          "spline-vendor": ["@splinetool/react-spline", "@splinetool/runtime"],

          // Icons & UI
          "ui-vendor": [
            "react-icons",
            "lucide-react",
            "clsx",
            "tailwind-merge",
          ],

          // Mesh utilities
          "mesh-vendor": ["meshline"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "three"],
    exclude: [
      "@splinetool/runtime", // Exclude heavy runtime
    ],
  },
});
