import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  fastRefresh: {},
});
