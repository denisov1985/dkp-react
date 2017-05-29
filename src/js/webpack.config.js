var webpack = require("webpack");
var path = require('path');
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/../../public/build',
        publicPath: '/build/',
        filename: 'bundle.js'
    },

    resolve: {
        root: path.resolve(__dirname),
        alias: {
            components: 'src/components',
        },
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        new webpack.OldWatchingPlugin()
    ],

};