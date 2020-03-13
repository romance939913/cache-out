const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: './frontend/robinhood.jsx',
    output: {
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    plugins: [
        new TerserPlugin({
        parallel: true,
        terserOptions: {
            ecma: 6,
        },
    })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};
