import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from "rollup-plugin-copy";

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: "node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
          dest: "public/", 
        },
      ],
      hook: "buildStart", 
    }),
  ],
})
