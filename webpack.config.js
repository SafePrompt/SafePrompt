const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
plugins: [
    new HtmlWebpackPlugin({
      title: 'SafePrompt',
      template: path.join(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, '/build'),
    //   publicPath: '/',
    // },
    hot: true, // enables Hot Module Replacement
    historyApiFallback: true,
    compress: true,
    port: 8080,
    // proxy: [
    //   {
    //     '/api': {
    //       target: `http://localhost:${process.env.SERV_PORT}/`,
    //     },
    //   },
    // ],
  },
};