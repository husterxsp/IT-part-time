const webpack = require('webpack');
const path = require('path');
const node_modules_dir = path.join(__dirname, 'node_modules');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: "/build/",
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.css'],
        alias: {},
    },
    postcss: [require('autoprefixer')],
    module: {
        noParse: [],
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(css|less)$/,
            loader: 'style!css!postcss!less'
        }, {
            test: /\.(ttf|eot|svg|woff|woff2?)(\?[a-z0-9]+)?$/,
            loader: 'file'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

};
