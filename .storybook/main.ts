import type { StorybookConfig } from '@storybook/react-webpack5';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../stories/**/*.@(mdx|stories.@(ts|tsx))'],
  staticDirs: ['./public'],

  addons: [
    '@storybook/addon-webpack5-compiler-swc',
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
    '@jbwatenbergscality/storybook-webmcp',
  ],
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
