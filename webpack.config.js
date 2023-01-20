const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const {nanoid} = require('nanoid')
const {WebpackPluginServe: Serve} = require('webpack-plugin-serve')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => {
   let plugins = []

   const src = path.resolve(__dirname, 'src')
   const frontend = path.resolve(src, 'frontend')
   const dist = path.resolve(__dirname, 'dist')
   const local = path.resolve(dist, '.local')

   console.log('\n\n webpack: Kue template builder')
   console.log(` app output directory: ${local}`)

   const entry = path.resolve(local, 'index.html')

   plugins.push(
      new HtmlWebpackPlugin({
         hash: true,
         template: path.resolve(dist, 'index.template.html'),
         filename: entry
      })
   )

   plugins.push(
      new HtmlReplaceWebpackPlugin(
         [
            {
               pattern: '_BUILD_',
               replacement: nanoid(8)
            }
         ]
      )
   )

   plugins.push(new Serve({
      port: 3002,
      static: local,
      open: false,
      hmr: true,
      host: 'localhost',
      liveReload: true
   }))

   // plugins.push(new BundleAnalyzerPlugin())

   const config = {
      mode: 'development',
      entry: ['webpack-plugin-serve/client', './src/index.tsx'],
      output: {
         publicPath: '',
         path: path.resolve(local),
         filename: 'app.js'
      },
      resolve: {
         extensions: ['.ts', '.tsx', '.js'],
         alias: {
            '@root': src,
            '@intf': path.resolve(src, 'intf'),
            '@helpers': path.resolve(src, 'helpers'),
            '@state': path.resolve(src, 'state'),
            '@frontend': frontend
         }
      },
      module: {
         strictExportPresence: true,
         rules: [
            {
               test: /\.ts|\.tsx$/,
               loader: 'ts-loader',
               options: {
                  configFile: 'tsconfig.webpack.json'
               },
               exclude: [
                  path.resolve(__dirname, 'node_modules')
               ]
            },
            {
               test: /\.s[ac]ss$/i,
               use: [
                  {
                     loader: 'file-loader',
                     options: {
                        outputPath: './styles',
                        name: 'local.min.css'
                     }
                  },
                  'sass-loader'
               ]
            }
         ]
      },
      devtool: 'inline-source-map',
      stats: 'errors-only',
      watch: true
   }

   return {...config, plugins}

}