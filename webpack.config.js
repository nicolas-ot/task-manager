const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), // giving a const path to the intended output folder
        publicPath: 'dist' // tells Webpack where to find the file
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/, 
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};