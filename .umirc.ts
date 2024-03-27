import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: {},
  publicPath: '/',
  fastRefresh: {},
});
