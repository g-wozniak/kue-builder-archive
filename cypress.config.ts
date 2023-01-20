import {defineConfig} from 'cypress'

export default defineConfig({
   fixturesFolder: false,
   screenshotOnRunFailure: false,
   trashAssetsBeforeRuns: true,
   video: false,
   videoUploadOnPasses: false,
   chromeWebSecurity: false,
   e2e: {
      viewportWidth: 1280,
      viewportHeight: 800,
      specPattern: '**/*.spec.ts',
      supportFile: false
   }
})