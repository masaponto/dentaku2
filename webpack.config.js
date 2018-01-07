const webpack = require("webpack");

module.exports = {

    entry: './src/ts/main.ts',

    output: {
        path: `${__dirname}/build`,
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
                //,
                // options: {
                //     appendTsSuffixTo: [/\.vue$/],
                // }
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
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
         new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: '"production"'
             }
         })
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [
            '.ts',
            '.vue',
            '.js'
        ]
    },

    devtool: 'source-map'
};
