const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = () => ({
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanPlugin(['./dist'])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-syntax-dynamic-import',
                                '@starmandeluxe/babel-plugin-react-component-data-attribute'
                            ],
                            presets: [
                                '@babel/preset-react',
                                ['@babel/preset-env', {
                                    targets: {
                                        browsers: [
                                            'last 2 Chrome versions',
                                            'last 2 Firefox versions',
                                            'last 2 Safari versions',
                                            'last 2 iOS versions',
                                            'Android >= 4.4',
                                            'Edge >= 12',
                                            'Explorer >= 11'
                                        ]
                                    }
                                }]
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
});
