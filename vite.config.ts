import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['ibuild.iclouds.co.uk','ipro.iclouds.co.uk','iflow.iclouds.co.uk','imax.iclouds.co.uk']
  },
})