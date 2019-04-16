const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FirstWebpackPlugin = require("./plugins/FirstWebpackPlugin");

module.exports = {
    entry: './src/js/component/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')         
    },   
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'                     
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                    loader: 'url-loader'
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'custom-loader'
            }
        ]
    },
    plugins: [        
        new HtmlWebpackPlugin({
        template: './src/index.html'
        }),
        new FirstWebpackPlugin()
    ]
}