import { devices, PlaywrightTestConfig} from '@playwright/test';
import path from "path";


const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "chrome",
      use: {
    ...devices["Desktop Chrome"],
    headless: true,
    screenshot: "on",
    video: "on",
    viewport: {width:1536, height:816}
  }
    },
    {
      name: "firefox",
      use: {
    ...devices["Desktop Firefox"],
    headless: true,
    screenshot: "on",
    video: "on",
    viewport: { width: 1536, height: 816 }
  }
    }

  ],
  testMatch: ["tests/**/*.test.ts"],
  timeout: 100000,
  reporter: "html",
  retries: 0,
  globalSetup: path.resolve(__dirname, "src/utils/globalSetup.ts"),
};

export default config;