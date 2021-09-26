const ESBuild = require('esbuild')
const vue = require('esbuild-vue')

ESBuild.build({
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  outfile: 'lib/index.js',
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
