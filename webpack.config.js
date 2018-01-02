const webpack = require("webpack");

module.exports = {

    entry: './src/main.ts',

    output: {
        path: `${__dirname}/build`,
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },

            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },

            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name:'[name].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],

    resolve: {
        extensions: [
            '.ts'
        ]
    },

    devtool: 'source-map'
};
