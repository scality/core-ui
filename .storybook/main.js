module.exports = {
  stories: ['../stories/**/*.@(mdx|stories.@(ts|tsx))'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    // '@storybook/addon-knobs',
    '@storybook/addon-mdx-gfm'
  ],

  webpackFinal: async (config, { configType }) => {
    // Resolve error when webpack-ing storybook:
    // Can't import the named export 'Children' from non EcmaScript module (only
    // default export is available)
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  }
};
