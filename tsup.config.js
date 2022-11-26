import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  clean: true,
  esbuildOptions: (options) => {
   options.footer = {
      js: 'module.exports = module.exports.default;'
    }
  },
  entry: ['lib/index.js'],
  outDir: 'build'
})
