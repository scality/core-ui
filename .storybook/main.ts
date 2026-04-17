import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: ['../stories/**/*.@(mdx|stories.@(ts|tsx))'],
  staticDirs: ['./public'],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook',
  ],
  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),

  webpackFinal: async (config, { configType }) => {
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
    defaultName: 'Stories',
  },

  managerHead: (head) => `
  ${head}
  <link rel="icon" href="/favicon.ico" />
`,

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
