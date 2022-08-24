import type { UserConfigExport } from "vite";
import type { UserConfig } from "vitest/config";
type Config =
  | UserConfigExport
  | {
      test: UserConfig["test"];
    };

export default function defineConfig(config: Config): Config {
  return config;
}