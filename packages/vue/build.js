const ESBuild = require('esbuild')
const vue = require('esbuild-vue')

ESBuild.build({
  format: 'esm',
  entryPoints: [
    './src/stories/DevToolbar.vue',
    './src/stories/Dropdown.vue',
    './src/stories/HostItem.vue',
    './src/stories/Item.vue',
    './src/stories/Button.vue',
  ],
  bundle: true,
  outdir: 'lib',
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
