import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
import lit from "@astrojs/lit";
import elm from "astro-integration-elm";

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:8000',
  integrations: [react(), tailwind(), mdx(), svelte(), vue(), solidJs(), lit(), elm()]
});