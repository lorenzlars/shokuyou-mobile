module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["@babel/plugin-proposal-decorators", {"legacy": true}],
      ["@babel/plugin-proposal-class-properties", {"loose": true}],
      // react-native-reanimated/plugin has to be listed last. https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#step-2-add-reanimateds-babel-plugin
      'react-native-reanimated/plugin'
    ]
  };
};
