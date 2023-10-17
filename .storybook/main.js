module.exports = {
  stories: ['../stories/**/*.@(mdx|stories.@(ts|tsx))'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    // '@storybook/addon-knobs',
    '@storybook/addon-mdx-gfm'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  }
};
