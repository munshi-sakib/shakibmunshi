import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to './' or your GitHub repository name if hosting under username.github.io/repo-name/
  base: './',
})