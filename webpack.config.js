const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')         
    },    
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"                    
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './client/src/index.html'
        //chunks: ['file1','file2']
    })
]
}