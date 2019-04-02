const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')         
    },    
    module: {
        rules: [
            {   test: '/\.m?js$/',
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
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
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './client/src/index.html',
        hash: true
        //chunks: ['file1','file2']
    })]
}