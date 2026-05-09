import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];

  // Update this to your GitHub repo name (e.g., '/zorvian-digital')
  const base = process.env.GITHUB_PAGES_BASE || '/';

  try {
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {
    // Ignore if optional module doesn't exist
  }

  return { plugins, base };
})