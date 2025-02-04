module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    // react-native-reanimated/plugin has to be listed last. https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#step-2-add-reanimateds-babel-plugin
    plugins: [["@babel/plugin-proposal-decorators", {"legacy": true}], 'react-native-reanimated/plugin']
  };
};
