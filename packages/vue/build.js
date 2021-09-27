const ESBuild = require('esbuild')
const vue = require('esbuild-vue')

ESBuild.build({
  format: 'esm',
  external: ['@vue/composition-api'],
  entryPoints: ['./src/stories'],
  bundle: true,
  outfile: 'lib/index.js',
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
