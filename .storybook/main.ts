import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: [
    '../stories/**/*.@(mdx|stories.@(ts|tsx))',
    '../stories/***/**/*.@(mdx|stories.@(ts|tsx))',
  ],
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-mdx-gfm',
  ],

  webpackFinal: async (config) => {
    // Resolve error when webpack-ing storybook:
    // Can't import the named export 'Children' from non EcmaScript module (only
    // default export is available)
    config.module?.rules?.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {
    autodocs: true,
    defaultName: 'Stories',
  },
  managerHead: (head) => `
  ${head}
  <link rel="icon" href="/favicon.ico" />
`,
};

export default config;
