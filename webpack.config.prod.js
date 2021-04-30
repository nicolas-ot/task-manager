const path = require('path');
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
        // PublicPath is not needed
    },
    devtool: 'none',
    module: { //applied on a per-file level
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
    },
    plugins: [ //extra extension which will be applied to the entire project
        new CleanPlugin.CleanWebpackPlugin() //delete everything on dist before anything new is added
        // first install package clean-webpack-plugin
    ]
};