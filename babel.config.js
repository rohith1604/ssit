module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        [
          'module-resolver',
          {
            root: ['./'],
            extensions: [
              '.ios.ts',
              '.android.ts',
              '.ts',
              '.ios.tsx',
              '.android.tsx',
              '.tsx',
              '.jsx',
              '.js',
              '.json',
            ],
            alias: {
              '@': './',
              '@components': './components',
              '@screens': './screens',
            },
          },
        ],
      ],
    };
  };