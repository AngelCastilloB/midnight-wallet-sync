const path = require('node:path');

const outputPath = path.join(__dirname, 'dist', 'js');
console.log("Output path:", outputPath);

module.exports = {
    target: 'node',
    entry: './src/index.ts',
    mode: 'development',
    node: {
        __dirname: false,
        __filename: false,
        global: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        fallback: {
        },
    },
    module: {
        rules: [
            {
                exclude: /node_modules\/(?!(@lib)|(@module)\/).*/,
                resolve: { fullySpecified: false },
                test: /\.(js|tsx?)$/,
                use: [
                    {
                        loader: 'swc-loader',
                    },
                ],
            },
            {
                resolve: { fullySpecified: false },
                test: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist', 'js'),
        libraryTarget: 'commonjs2',
    },
    plugins: [
    ],
};
