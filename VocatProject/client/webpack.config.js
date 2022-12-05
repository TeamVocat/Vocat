module: {
    rules: [
        {
            test: path.join(__dirname, '.'),
            include: [
              path.resolve(__dirname, 'App.js'),
              path.resolve(__dirname, 'index.js'),
              path.resolve(__dirname, '@babel/preset-react')
            ],
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  {
                    'plugins': ['@babel/plugin-proposal-class-properties']
                  }]
            }
        }
    ]
}
module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          // 
          "fs": false,
          "os": false,
          "path": false,
        }
      }
    }
  }