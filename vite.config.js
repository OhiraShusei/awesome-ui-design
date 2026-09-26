import { defineConfig } from 'vite';
import { portalPages } from './src/portal-pages.js';

export default defineConfig({ base: './', plugins: [portalPages()] });
