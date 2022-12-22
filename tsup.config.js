import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    format: ['cjs', 'esm'],
    dts: options.dts,
    watch: options.watch,
    clean: true,
    esbuildOptions: (options) => {
      options.footer = {
        js: 'module.exports = module.exports.default;'
      }
    },
    entry: ['lib/index.js'],
    outDir: 'build'
  }
})
