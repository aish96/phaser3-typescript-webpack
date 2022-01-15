var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
// var phaserModule = path.join(__dirname, '/node_modules/phaser/');
// var phaser = path.join(phaserModule, 'src/phaser.js');

// var definePlugin = new webpack.DefinePlugin({
//     __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//     WEBGL_RENDERER: true,
//     CANVAS_RENDERER: true
// });

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        noInfo: true
    },
    entry: {
        app: [path.resolve(__dirname, 'src/main.ts')],
        vendor: ['phaser']
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'game.bundle.js'
    },
    watch: true,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: '[name].bundle.js'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ gameName: 'My Phaser Game', template: 'index.html' }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
            // { from: 'pwa', to: '' },
            // { from: 'src/favicon.ico', to: '' }
        ])
        // new InjectManifest({
        //     swSrc: path.resolve(__dirname, '../pwa/sw.js')
        // })
    ]
};
